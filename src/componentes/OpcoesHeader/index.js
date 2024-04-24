import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcao = styled.li`
min-width: 120px;
font-size: 16px;
justify-content: center;
align-items: center;
text-align: center;
display: flex;
height: 100%;
cursor: pointer;
padding: 0 5px;
`
const Opcoes = styled.ul`
display: flex;
`
const textoOpcoes=['','',''];
export default function OpcoesHeader(){
    return(  
    <Opcoes>
    {textoOpcoes.map((texto)=>(
     <Link to={`/${texto.toLowerCase()}`}><Opcao><p>{texto}</p></Opcao></Link>
    ))}
    </Opcoes>
    )
}