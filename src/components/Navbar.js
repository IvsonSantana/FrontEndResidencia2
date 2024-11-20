import React, { useState } from "react";
import TrashIcon from "../assets/Trash.png";
import IconSet from "../assets/IconSet.png";
import UserIcon from "../assets/User.png";
import IconSet1 from "../assets/IconSet (1).png";
import SignOutIcon from "../assets/SignOut.png";
import ChatTextIcon from "../assets/ChatText.png";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      {/* Botão de menu (fora do menu lateral) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* Menu lateral */}
      <div className={`left ${isMenuActive ? 'active' : ''}`}>
        <div className="top">
          <a href="#" className="yellow">
            <span>+</span>Nova Análise
          </a>
          <a href="#">
            <img src={ChatTextIcon} alt="Chat" />Nxo Ética
          </a>
          <a href="#">
            <img src={ChatTextIcon} alt="Chat" />Impacto Nxo
          </a>
        </div>
        <div className="bottom">
          <a href="#">
            <img src={TrashIcon} alt="Lixeira" />Apagar Análises
          </a>
          <a href="#">
            <img src={IconSet} alt="Modo Claro" />Modo Claro
          </a>
          <a href="#">
            <img src={UserIcon} alt="Usuário" />Minha Conta
          </a>
          <a href="#">
            <img src={IconSet1} alt="Atualizações" />Atualizações
          </a>
          <a href="#">
            <img src={SignOutIcon} alt="Sair" />Sair
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
