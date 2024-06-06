import React, { useState, useRef, useEffect } from 'react';
import './teste.css'; // Importar o CSS aplicável
import imagem1 from '../../assets/tperna.webp';
import imagem2 from '../../assets/tpeito.jpg';
import imagem3 from '../../assets/tcosta.webp';
import imagem4 from '../../assets/perna.jpg';
import { faTrash, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BankAccountProps {
    treino: string;
    grupomuscular: string;
    imagem: string;
}

const BankAccount: React.FC<BankAccountProps> = ({ treino, grupomuscular, imagem }) => (
  <a className="bank-account">
        <img className="flag" aria-hidden="true" src={imagem}  />
        <div>
            <h2 role="presentation">{treino}</h2>
            <div className="grupomuscular">{grupomuscular}</div>
        </div>
    </a>
);

const BankAccounts: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const bankAccountsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
            if (bankAccountsRef.current) {
                bankAccountsRef.current.style.cursor = 'grab';
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !bankAccountsRef.current) return;
            e.preventDefault();
            const x = e.pageX - bankAccountsRef.current.offsetLeft;
            const y = e.pageY - bankAccountsRef.current.offsetTop;
            const walkX = (x - startX) * 1; // The speed of horizontal scrolling
            const walkY = (y - startY) * 1; // The speed of vertical scrolling
            bankAccountsRef.current.scrollLeft = scrollLeft - walkX;
            bankAccountsRef.current.scrollTop = scrollTop - walkY;
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, startX, startY, scrollLeft, scrollTop]);

    const handlePrevious = () => {
        if (bankAccountsRef.current) {
            bankAccountsRef.current.scrollLeft -= 150; // Scroll 100 pixels para a esquerda
        }
    };

    const handleNext = () => {
        if (bankAccountsRef.current) {
            bankAccountsRef.current.scrollLeft += 150; // Scroll 100 pixels para a direita
        }
    };

    const accounts = [
        { treino: 'treino 1', grupomuscular: 'Perna', imagem:imagem1 },
        { treino: 'treino 2', grupomuscular: 'Peito', imagem: imagem2 },
        { treino: 'treino 3', grupomuscular: 'Costas', imagem: imagem3 },
        { treino: 'treino 4', grupomuscular: 'Quadríceps', imagem: imagem4 },
        { treino: 'treino 5', grupomuscular: 'Perna', imagem: imagem1 }
    ];

    return (
        <div className="container-treino">
          <div className='treino-carrossel'>
            <div className="action-buttons">
            <a aria-expanded="false" href="#" className="action-button">
                  <FontAwesomeIcon icon={faShare} className="action-button" width="16" height="16" fill="currentColor" focusable="false" />
                  Compartilhar Treino
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                  <FontAwesomeIcon icon={faPlus} className="action-button" width="16" height="16" fill="currentColor" focusable="false" />
                  Criar Treino
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                  <FontAwesomeIcon icon={faTrash} className="action-button" width="16" height="16" fill="currentColor" focusable="false" />
                  Apagar Treino
                </a>
                
                <button type="button" disabled id="action-button--previous" className="action-button--horizontal-scroll" onClick={handlePrevious}>
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
                </button>
                <button type="button" id="action-button--next" className="action-button--horizontal-scroll" onClick={handleNext}>
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
                </button>
            </div>
            <div id="bank-accounts" ref={bankAccountsRef} className="bank-accounts" onMouseDown={e => {
                setIsDragging(true);
                setStartX(e.pageX - (bankAccountsRef.current?.offsetLeft ?? 0));
                setStartY(e.pageY - (bankAccountsRef.current?.offsetTop ?? 0));
                setScrollLeft(bankAccountsRef.current?.scrollLeft ?? 0);
                setScrollTop(bankAccountsRef.current?.scrollTop ?? 0);
                if (bankAccountsRef.current) {
                    bankAccountsRef.current.style.cursor = 'grabbing';
                }
            }} onMouseLeave={() => {
                setIsDragging(false);
                if (bankAccountsRef.current) {
                    bankAccountsRef.current.style.cursor = 'grab';
                }
            }}>
                {accounts.map(account => (
                    <BankAccount {...account} />
                ))}
            </div>
            </div>
        </div>
    );
};

export default BankAccounts;