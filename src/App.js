import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import AnalysisSection from "./components/AnalysisSection";
import "./App.css";

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Função para lidar com a mudança de arquivo
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setErrorMessage(null);
    setAnalysisResult(null);
  };

  // Função para analisar o PDF
  const handleAnalyze = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      setErrorMessage("Por favor, selecione um arquivo PDF");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post("http://localhost:3000/analyze-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setAnalysisResult({
          pdfText: response.data.pdfText,
          suggestion: response.data.suggestion,
          pdfUrl: response.data.pdfUrl, // URL do PDF gerado
        });
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

  // Função para salvar a análise
  // Função para salvar a análise
const handleSave = async () => {
  if (!analysisResult) {
    setErrorMessage("Nenhum resultado de análise para salvar.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/save-analysis", {
      suggestion: analysisResult.suggestion,
    });

    if (response.data.success) {
      alert("Análise salva com sucesso!");
      // Recarrega a página após o salvamento
      window.location.reload();
    } else {
      setErrorMessage("Erro ao salvar a análise. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao salvar a análise:", error);
    setErrorMessage("Erro ao salvar a análise. Tente novamente.");
  }
};


  // Função para descartar a análise
  const handleDiscard = () => {
    setAnalysisResult(null);
    setPdfFile(null);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="right">
        {!analysisResult ? (
          <UploadSection
            handleSubmit={handleAnalyze}
            handleFileChange={handleFileChange}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        ) : (
          <AnalysisSection
            analysisResult={analysisResult}
            handleSave={handleSave}
            handleDiscard={handleDiscard}
          />
        )}
      </div>
    </div>
  );
};

export default App;