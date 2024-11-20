import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import AnalysisSection from "./components/AnalysisSection";
import LoadingMessage from "./components/LoadingMessage";
import "./App.css";

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setErrorMessage(null);
    setIsAnalysisComplete(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      setErrorMessage("Por favor, selecione um arquivo PDF");
      return;
    }

    setIsLoading(true);
    setIsAnalysisComplete(false);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post("https://projetoresidenciallm.onrender.com/analyze-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        fetchLastAnalysis();
      } else {
        setErrorMessage("Erro ao processar o PDF. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao processar o PDF:", error);
      setErrorMessage("Erro ao processar o PDF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLastAnalysis = async () => {
    try {
      const response = await axios.get("https://projetoresidenciallm.onrender.com/latest-analysis");
      if (response.data.success) {
        setLastAnalysis(response.data.analysis);
        setIsAnalysisComplete(true);
      } else {
        console.error("Erro ao buscar a última análise:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar a última análise:", error);
    }
  };

  // Função para voltar à tela de upload
  const handleGoBack = () => {
    setIsAnalysisComplete(false); // Exibe novamente a tela de upload
    setPdfFile(null); // Limpa o arquivo PDF
    setErrorMessage(null); // Limpa a mensagem de erro, se houver
  };

  return (
    <div className="app">
      <Navbar />
      <div className="right">
        {!isAnalysisComplete ? (
          <UploadSection
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        ) : (
          <AnalysisSection lastAnalysis={lastAnalysis} goBack={handleGoBack} />
        )}
        {isLoading && <LoadingMessage />}
      </div>
    </div>
  );
};

export default App;
