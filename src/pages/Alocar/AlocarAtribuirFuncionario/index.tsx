import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import { Content, All, PositionMenu, Table } from "./style";
import Menu from "../../../components/Menu";
import Informations from "../../../components/Informations/InformationsAlocarFuncionario";
import FilterFunc from "../../../components/Filters/FilterAlocarFuncionario";
import { useParams } from "react-router";
import api from "../../../services/api";

interface Consultor {
  id: number,
  nome: string,
  demandas: number,
  precoHora: number,
  email: string,
  status: string,
  dataFormatada: string,
  fornecedor: {
    id: number,
    nome: string,
    email: string
  }
}


const AlocarAtribuirFuncionario: React.FC = () => {

  const { id }: {id:string} = useParams();
  const [ valores, setValores ] = useState<Consultor>();

  useEffect(() => {
    async function carregaDados(): Promise<void>  {
      const token = localStorage.getItem("@Geprot:token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.get(`usuarios/buscar/consultor/${id}`, config).then(response => {
        setValores(response.data);
      })
    }
    carregaDados();
  }, [ ]);


  return(
    <>
    <Header />

    <All>

        <Content>

          <div className="funcionario">

            <div className="line">
              <p className="helvetica bold cor_0 fonte_20"> {valores?.nome} </p>

              <p className="helvetica bold cor_5 fonte_15"> STATUS: {valores?.status}</p>
            </div>

            <div className="line">
              <div className="col">
                <p className="helvetica lighter cor_0 fonte_15"> Cadastro: </p>
              </div>

              <div className="col">
                <p className="helvetica bold cor_0 fonte_15"> {valores?.id} </p>
              </div>

              <div className="col">
                <p className="helvetica lighter cor_0 fonte_15"> Data do cadastro: </p>
              </div>

              <div className="col">
                <p className="helvetica bold cor_0 fonte_15"> {valores?.dataFormatada} </p>
              </div>
            </div>

            <div className="line">
            <div className="col">
                <p className="helvetica lighter cor_0 fonte_15"> Fornecedor: </p>
              </div>

              <div className="col">
                <p className="helvetica bold cor_0 fonte_15"> {valores?.fornecedor.nome} </p>
              </div>

              <div className="col">
                <p className="helvetica lighter cor_0 fonte_15"> Valor da hora: </p>
              </div>

              <div className="col">
                <p className="helvetica bold cor_0 fonte_15"> R$ {valores?.precoHora} </p>
              </div>
            </div>

            <div className="line">
            <div className="col">
                <b className="helvetica lighter cor_0 fonte_15"> Email do Consultor: </b>
                <b className="helvetica bold cor_0 fonte_15"> {valores?.email} </b>
              </div>

              <div className="col">

              </div>

            </div>

            <div className="line">
              <div className="col">
                <b className="helvetica lighter cor_0 fonte_15"> Email do fornecedor: </b>
                <b className="helvetica bold cor_0 fonte_15"> {valores?.fornecedor.email} </b>
              </div>

              <div className="col">
              </div>
            </div>


          </div>

          <div className="header_filtros">
            <b className="helvetica fonte_15 cor_5 bold"> Filtros </b>
            <hr className="cor_6f"/>
          </div>

          <FilterFunc/>

          <Table>

              <div className="header">
                <div className="title1">
                  <p className="helvetica bold cor_0">Número</p>
                </div>

                <div className="title2">
                  <p className="helvetica bold cor_0">Título do projeto</p>
                </div>

                <div className="title2">
                  <p className="helvetica bold cor_0">Responsável</p>
                </div>

                <div className="title1">
                  <p className="helvetica bold cor_0">Criação</p>
                </div>

                <div className="title1">
                  <p className="helvetica bold cor_0"> Atribuição </p>
                </div>

              </div>

              <div className="contant_informations">
                <Informations/>
              </div>

          </Table>



        </Content>

        <PositionMenu>
          <Menu/>
        </PositionMenu>
  </All>
    </>
  )
}

export default AlocarAtribuirFuncionario;
