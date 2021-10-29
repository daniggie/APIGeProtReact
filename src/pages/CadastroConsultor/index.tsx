import React, {useRef, useCallback, useState} from "react";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import { All, Container } from "./style"
import BotaoCancel from "../../components/Buttons/ButtonCancel";
import api from "../../services/api";
import { useHistory } from "react-router";
import InputRegister from "../../components/InputRegister";
import * as Yup from "yup";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";
import ButtonRegister from "../../components/Buttons/ButtonRegister";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface Consultor {
  id: number,
  usuario: {
    nome: string,
    email: string,
    senha: string,
  },
  fornecedor: {
    id: number,
  },
  precoHora: number,
}

const CadastrarConsultor: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  
  const consultor = {
    id: 0,
    usuario: {
      nome: "",
      email: "",
      senha: ""
    },
    fornecedor: {
      id: 0,
    },
    precoHora: 0,
  }


  const cadastrarConusltor = useCallback( async (data: Consultor) => {
    try{
      formRef.current?.setErrors({})

      consultor.usuario.nome = (document.getElementById('nome') as HTMLInputElement).value;
      consultor.id = parseInt((document.getElementById('id') as HTMLInputElement).value);
      consultor.usuario.email = (document.getElementById('email') as HTMLInputElement).value;
      consultor.usuario.senha = (document.getElementById('senha') as HTMLInputElement).value;
      consultor.fornecedor.id = parseInt((document.getElementById('idFornecedor') as HTMLInputElement).value);
      consultor.precoHora = parseFloat((document.getElementById('precoHora') as HTMLInputElement).value);                               
      const token = localStorage.getItem("@Geprot:token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const schema = Yup.object().shape({
        email: Yup.string()
        .required("E-mail obrigátorio")
        .email("Informe um e-mail válido"),
        senha:Yup.string().min(6, "No mínimo 6 dígitos"),
        nome: Yup.string()
        .required("O nome é obrigatório"),
        id: Yup.number()
        .required("O ID é obrigatório"),
        idFornecedor: Yup.number()
        .required("O ID é obrigatório"),
        precoHora: Yup.number()
        .required("A hora é obrigatória")
      })

      await schema.validate(data, {
        abortEarly: false,
      })  

      await api.post("/consultor/cadastrar", consultor, config);

      addToast({
        type:"success",
        title:"Cadastro realizado",
        description:"Consultor cadastrado com sucesso!"
      })

      history.push('/home')

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return
      }

      addToast({
        type:"error",
        title:"Erro no cadastro",
        description:"Ocorreu um erro ao realizar o cadastro. Tente novamente!"
      })
    }
  }, [addToast, history]);

  const [showPass, setShowPass] = useState(false);
  const handleClickPass = (e:any) => {
    e.preventDefault()
    setShowPass(!showPass)
  };

  return (
    <>
    <Header />
      <All>
        <Container>
          <div className="title">
            <b className="helvetica fonte_20 cor_5">CADASTRO DE CONSULTOR</b>
          </div>
          <Form ref={formRef} onSubmit={cadastrarConusltor}>
            <div className="container_square">

              <div className="column">
                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">Nome do consultor:</p>
                  <InputRegister name="nome" id="nome" placeholder="Digite o nome..."/>
                </div>

                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">Email:</p>
                  <InputRegister name="email" id="email" placeholder="Digite o email..."/>
                </div>

                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">Senha:</p>
                  <InputRegister name="senha" id="senha" type={showPass ? "text" : "password"} placeholder="Digite a senha..."/>
                  <div className="login_eye">
                    {showPass ? (<HiEye size={25} color="#00579E" onClick={handleClickPass}/>) : (<HiEyeOff color="#e1dcda" size={25} onClick={handleClickPass}/>)}
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">ID do Consultor:</p>
                  <InputRegister name="id" id="id" placeholder="Digite o ID..."/>
                </div>

                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">Preço das horas:</p>
                  <InputRegister name="precoHora" id="precoHora" placeholder="Digite o preço..."/>
                </div>

                <div className="line">
                  <p className="helvetica fonte_15 cor_5 bold">ID do Fornecedor:</p>
                  <InputRegister name="idFornecedor" id="idFornecedor" placeholder="Digite o ID..."/>
                </div>
              </div>

              <div className="position">
                <BotaoCancel/>
                <ButtonRegister type="submit">Cadastrar</ButtonRegister>
              </div>
            </div>
          </Form>
        </Container>
        <Menu/>
      </All>
    </>
  )
};

export default CadastrarConsultor;
