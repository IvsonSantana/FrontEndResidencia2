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
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setErrorMessage(null);
    setAnalysisResult(null);
  };


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
      const response = await axios.post("https://projetoresidenciallm.onrender.com/analyze-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setAnalysisResult({
          pdfText: response.data.pdfText,
          suggestion: response.data.suggestion,
          pdfUrl: response.data.pdfUrl,
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
            handleDiscard={handleDiscard}
          />
        )}
      </div>
    </div>
  );
};

export default App;
