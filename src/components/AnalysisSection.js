import React from "react";
import "./AnalysisSection.css";

const AnalysisSection = ({ analysisResult, handleSave, handleDiscard }) => {
  return (
    <div className="analysis-result">
      <div className="inside">
        <h3 className="result">Resultado da Análise</h3>
        <p className="suggestion">{analysisResult.suggestion}</p>
      </div>
      {/* Botões de ação */}
      <div className="actions">
        <button onClick={handleSave} className="save-button">
          Salvar
        </button>
        <button onClick={handleDiscard} className="discard-button">
          Descartar
        </button>
      </div>
    </div>
  );
};

export default AnalysisSection;
