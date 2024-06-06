import React, { useState } from "react";
import "./bottomcomunidademain.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import instance from "../../axios/custom";

interface ChatModalProps {
  onClose: () => void;
  onShare: (description: string, photoUrl: string) => void;
  treinoRealizadoId: number;
}

const ChatModal: React.FC<ChatModalProps> = ({
  onClose,
  onShare,
  treinoRealizadoId,
}) => {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  // const handleShare = async () => {
  //   if (photo && description) {
  //     setUploading(true);
  //     try {
  //       const storageRef = ref(storage, `images/${photo.name}`);
  //       const uploadTask = uploadBytesResumable(storageRef, photo);

  //       uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {
  //           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log('Upload is ' + progress + '% done');
  //         },
  //         (error) => {
  //           console.error('Upload failed:', error);
  //           setUploading(false);
  //         },
  //         async () => {
  //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //           try {
  //             await instance.put(`/treino-realizado/${treinoRealizadoId}`, {
  //               descricao: description,
  //               foto: downloadURL,
  //             });
  //             onShare(description, downloadURL);
  //             setUploading(false);
  //             onClose();
  //           } catch (error) {
  //             console.error('Error saving treino:', error);
  //             setUploading(false);
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //       setUploading(false);
  //     }
  //   } else {
  //     console.log('Descrição ou foto não foram fornecidos.');
  //   }
  // };

  const handleShare = async () => {
    try {
      await instance.put(`/treino-realizado/${treinoRealizadoId}`, {
        descricao: description,
        foto: "",
      });
      onShare(description, "");
      setUploading(false);
      onClose();
    } catch (error) {
      console.error("Error saving treino:", error);
      setUploading(false);
    }
  };
  return (
    <div className="modal-overlay-chat">
      <div className="modal-chat">
        <div className="topmodal-chat">
          <h3>Compartilhar Nova Foto</h3>
          <div className="cancel" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className="cancel-icon" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <button onClick={handleShare} disabled={uploading}>
          {uploading ? "Uploading..." : "Finalizar Treino"}
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
