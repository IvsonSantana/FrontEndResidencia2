import React from "react";
import "./UploadSection.css";
import Logo from "../assets/image 1 (2).png"; // Caminho correto para a imagem

const UploadSection = ({ handleSubmit, handleFileChange, isLoading, errorMessage }) => {
  return (
    <div className="center">
      {/* Logo e texto */}
      <img src={Logo} alt="Logo da marca" />
      <p>Além de Conexões</p>

      {/* Seção de upload de PDF */}
      <div className="input">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            id="pdf-file"
            name="pdf"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processando..." : "Enviar PDF"}
          </button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default UploadSection;
