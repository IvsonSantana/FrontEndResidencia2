import React from "react";
import "./AnalysisSection.css";

const AnalysisSection = ({ lastAnalysis, goBack }) => {
  return (
    <div className="last-analysis">
      <h3>Última Análise</h3>
      <p><strong>Sugestão:</strong> {lastAnalysis.suggestion}</p>
      {/* Se você quiser mostrar mais dados da análise, adicione aqui */}

      {/* Botão Voltar */}
      <button onClick={goBack} className="back-button">
        Voltar para o Upload
      </button>
    </div>
  );
};

export default AnalysisSection;
