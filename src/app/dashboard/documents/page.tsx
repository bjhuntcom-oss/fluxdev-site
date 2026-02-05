"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  Download,
  Trash2,
  Eye,
  X,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { sanitizeInput } from "@/lib/security";
import { useToast } from "@/components/ui/Toast";

interface Document {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  document_type: string;
  is_contract: boolean;
  created_at: string;
}

const documentTypes = [
  { value: "cahier_charges", label: "Cahier des charges" },
  { value: "maquette", label: "Maquette / Design" },
  { value: "contrat", label: "Contrat" },
  { value: "facture", label: "Facture" },
  { value: "autre", label: "Autre" },
];

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return <ImageIcon className="w-6 h-6" />;
  if (type === "application/pdf") return <FileText className="w-6 h-6" />;
  return <File className="w-6 h-6" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ITEMS_PER_PAGE = 12;

export default function DocumentsPage() {
  const { user } = useUser();
  const { showToast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("autre");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      // Get current user ID and role
      const { data: userData } = await supabase
        .from("users")
        .select("id, role")
        .eq("clerk_id", user?.id)
        .single();

      if (!userData) {
        setDocuments([]);
        setIsLoading(false);
        return;
      }

      const currentUserId = userData.id;
      const userRole = userData.role;

      // Build query based on role - STRICT CONFIDENTIALITY
      let query = supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply role-based filtering
      if (userRole === 'admin') {
        // Admin sees ALL documents
        // No filter needed
      } else if (userRole === 'staff' || userRole === 'dev') {
        // Staff/Dev sees documents from users whose conversations are assigned to them
        // OR documents linked to projects they work on
        // For now, filter by user_id of assigned conversations
        const { data: assignedConvs } = await supabase
          .from("conversations")
          .select("user_id")
          .eq("assigned_staff_id", currentUserId);
        
        const assignedUserIds = assignedConvs?.map(c => c.user_id).filter(Boolean) || [];
        // Include own documents + documents from assigned users
        if (assignedUserIds.length > 0) {
          query = query.or(`user_id.eq.${currentUserId},user_id.in.(${assignedUserIds.join(',')})`);
        } else {
          query = query.eq("user_id", currentUserId);
        }
      } else {
        // Regular User sees ONLY their own documents
        query = query.eq("user_id", currentUserId);
      }

      const { data, error } = await query;

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          setDocuments([]);
          return;
        }
        throw error;
      }
      setDocuments(data || []);
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (!err.message?.includes('does not exist')) {
        console.error("Error loading documents:", error);
        setError("Erreur lors du chargement des documents");
      }
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError("Le fichier est trop volumineux (max 50MB)");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Type de fichier non autorisé");
      return;
    }

    setSelectedFile(file);
    setShowUploadModal(true);
    setError(null);
  };

  const uploadDocument = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Try to find user by clerk_id
      let { data: userData } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single();

      // If not found, create user in Supabase
      if (!userData) {
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            clerk_id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            first_name: user.firstName || "",
            last_name: user.lastName || "",
            avatar_url: user.imageUrl || "",
            role: "user",
            status: "active",
          })
          .select("id")
          .single();

        if (createError) throw new Error("Could not create user: " + createError.message);
        userData = newUser;
      }

      if (!userData) throw new Error("User not found");

      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${userData.id}/${Date.now()}.${fileExt}`;

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, selectedFile);

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("documents").insert({
        user_id: userData.id,
        file_name: sanitizeInput(selectedFile.name),
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        file_url: urlData.publicUrl,
        storage_path: fileName,
        document_type: documentType,
        is_contract: documentType === "contrat",
      });

      if (dbError) throw dbError;

      setUploadProgress(100);
      setSuccess("Document uploadé avec succès");
      setShowUploadModal(false);
      setSelectedFile(null);
      setDocumentType("autre");
      loadDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Erreur lors de l'upload du document");
      showToast("Erreur lors de l'upload du document", "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteDocument = async (doc: Document) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([doc.file_url.split("/documents/")[1]]);

      if (storageError) console.error("Storage error:", storageError);

      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", doc.id);

      if (dbError) throw dbError;

      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
      setSuccess("Document supprimé");
      showToast("Document supprimé", "success");
    } catch (error) {
      console.error("Error deleting document:", error);
      setError("Erreur lors de la suppression");
      showToast("Erreur lors de la suppression du document", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Fichiers</p>
            <h1 className="text-xl font-light text-white">Documents</h1>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Uploader
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.06] text-white/70">
          <span className="text-sm">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.06] text-white/70">
          <span className="text-sm">{success}</span>
          <button onClick={() => setSuccess(null)} className="ml-auto text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border border-dashed p-8 text-center transition-all
          ${dragActive 
            ? "border-white/20 bg-white/[0.02]" 
            : "border-white/[0.08] hover:border-white/10"
          }
        `}
      >
        <Upload className="w-8 h-8 mx-auto text-white/30 mb-4" />
        <p className="text-white/60 text-sm mb-2">Glissez-deposez vos fichiers ici</p>
        <p className="text-white/30 text-xs mb-4">ou</p>
        <label className="cursor-pointer">
          <span className="px-4 py-2 border border-white/10 text-white/70 text-sm hover:bg-white/[0.04] transition-colors">
            Parcourir
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx,.zip,.txt"
          />
        </label>
        <p className="text-white/20 text-xs mt-4">
          PDF, Images, Word, Excel, ZIP (max 50MB)
        </p>
      </div>

      {/* Documents List */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Vos documents</p>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <FolderOpen className="w-8 h-8 mx-auto mb-4 opacity-40" />
            <p className="text-sm text-white/50">Aucun document</p>
            <p className="text-xs text-white/30">Uploadez votre premier fichier</p>
          </div>
        ) : (
          <>
          <div className="border border-white/[0.06]">
            {documents
              .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((doc, index, arr) => (
              <div
                key={doc.id}
                className={`flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors ${index !== arr.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
              >
                <div className="p-2 text-white/40">
                  {getFileIcon(doc.file_type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white/80 text-sm font-light truncate">{doc.file_name}</h3>
                  <div className="flex items-center gap-3 text-white/40 text-xs">
                    <span>{formatFileSize(doc.file_size)}</span>
                    <span>-</span>
                    <span>{documentTypes.find((t) => t.value === doc.document_type)?.label || "Autre"}</span>
                    <span>-</span>
                    <span>{format(new Date(doc.created_at), "dd MMM yyyy", { locale: fr })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                    title="Aperçu"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <a
                    href={doc.file_url}
                    download={doc.file_name}
                    className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deleteDocument(doc)}
                    className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {documents.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-white/40">
                {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, documents.length)} sur {documents.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                <span className="text-white/50 px-2">
                  {currentPage} / {Math.ceil(documents.length / ITEMS_PER_PAGE)}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(documents.length / ITEMS_PER_PAGE), p + 1))}
                  disabled={currentPage >= Math.ceil(documents.length / ITEMS_PER_PAGE)}
                  className="px-3 py-1 border border-white/10 text-white/60 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => !isUploading && setShowUploadModal(false)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/[0.06] p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Upload</p>
              {!isUploading && (
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              )}
            </div>

            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-white/[0.06]">
                  <div className="text-white/40">
                    {getFileIcon(selectedFile.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-light truncate">{selectedFile.name}</p>
                    <p className="text-white/40 text-xs">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Type</label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/10"
                  >
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-black">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Upload en cours...</span>
                      <span className="text-white/70">{uploadProgress}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-white/60 transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setShowUploadModal(false);
                    }}
                    disabled={isUploading}
                    className="flex-1 py-3 border border-white/[0.06] text-white/70 text-sm hover:bg-white/[0.02] transition-colors disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={uploadDocument}
                    disabled={isUploading}
                    className="flex-1 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Upload...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Uploader
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border border-dashed border-white/[0.08] p-8 text-center hover:border-white/10 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-white/30 mb-4" />
                  <p className="text-white/60 text-sm mb-2">Selectionnez un fichier</p>
                  <p className="text-white/30 text-xs">PDF, Images, Word, Excel, ZIP</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx,.zip,.txt"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/[0.06] w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="text-white/40">{getFileIcon(previewDoc.file_type)}</div>
                <div>
                  <p className="text-white/80 text-sm font-light">{previewDoc.file_name}</p>
                  <p className="text-white/40 text-xs">{formatFileSize(previewDoc.file_size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewDoc.file_url}
                  download={previewDoc.file_name}
                  className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                  title="Telecharger"
                >
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={previewDoc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4 min-h-[400px]">
              {previewDoc.file_type.startsWith("image/") ? (
                <div className="flex items-center justify-center h-full">
                  <img
                    src={previewDoc.file_url}
                    alt={previewDoc.file_name}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>
              ) : previewDoc.file_type === "application/pdf" ? (
                <iframe
                  src={previewDoc.file_url}
                  className="w-full h-[70vh] border-0"
                  title={previewDoc.file_name}
                />
              ) : previewDoc.file_type === "text/plain" ? (
                <iframe
                  src={previewDoc.file_url}
                  className="w-full h-[70vh] border-0 bg-white/5"
                  title={previewDoc.file_name}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-white/20 mb-4">{getFileIcon(previewDoc.file_type)}</div>
                  <p className="text-white/60 text-sm mb-2">Apercu non disponible pour ce type de fichier</p>
                  <p className="text-white/40 text-xs mb-4">{previewDoc.file_type}</p>
                  <a
                    href={previewDoc.file_url}
                    download={previewDoc.file_name}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Telecharger le fichier
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
