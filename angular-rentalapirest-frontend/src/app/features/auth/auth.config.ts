export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'date';
  placeholder: string;
  validators: string[];
  minLength?: number;
  maxLength?: number;
  errorMessages?: { [key: string]: string };
}

export interface AuthFormConfig {
  title: string;
  submitButtonText: string;
  fields: FormField[];
  showPasswordConfirmation?: boolean;
}

const BASE_AUTH_FIELDS: FormField[] = [
  {
    name: 'username',
    label: 'Usuário',
    type: 'text',
    placeholder: 'Digite seu usuário',
    minLength: 8,
    maxLength: 20,
    validators: ['required', 'minLength:8', 'maxLength:20'],
    errorMessages: {
      required: 'Username é obrigatório',
      minlength: 'Username deve conter entre 8 e 20 caracteres',
      maxlength: 'Username deve conter entre 8 e 20 caracteres',
    },
  },
  {
    name: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    minLength: 6,
    maxLength: 8,
    validators: ['required', 'minLength:6', 'maxLength:8'],
    errorMessages: {
      required: 'Senha é obrigatória',
      minlength: 'Senha deve conter entre 6 e 8 caracteres',
      maxlength: 'Senha deve conter entre 6 e 8 caracteres',
    },
  },
];

const REGISTER_ONLY_FIELDS: FormField[] = [
  {
    name: 'nomeCompleto',
    label: 'Nome Completo',
    type: 'text',
    placeholder: 'Digite seu nome completo',
    minLength: 3,
    maxLength: 100,
    validators: ['required', 'minLength:3', 'maxLength:100'],
    errorMessages: {
      required: 'Nome é obrigatório',
      minlength: 'Nome deve ter entre 3 e 100 caracteres',
      maxlength: 'Nome deve ter entre 3 e 100 caracteres',
    },
  },
  {
    name: 'cpf',
    label: 'CPF',
    type: 'text',
    placeholder: '000.000.000-00',
    validators: ['required', 'cpf'],
    errorMessages: {
      required: 'CPF é obrigatório',
      cpf: 'CPF inválido',
    },
  },
  {
    name: 'telefone',
    label: 'Telefone',
    type: 'text',
    placeholder: '28999887766',
    validators: ['required', 'pattern:^\\d{10,11}$'],
    errorMessages: {
      required: 'Telefone é obrigatório',
      pattern: 'Telefone deve conter 10 ou 11 dígitos',
    },
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'seu@email.com',
    validators: ['required', 'email'],
    errorMessages: {
      required: 'Email é obrigatório',
      email: 'Email inválido',
    },
  }
];

export const LOGIN_CONFIG: AuthFormConfig = {
  title: 'Login',
  submitButtonText: 'Entrar',
  fields: BASE_AUTH_FIELDS,
};

export const REGISTER_CONFIG: AuthFormConfig = {
  title: 'Cadastro',
  submitButtonText: 'Cadastrar',
  showPasswordConfirmation: true,
  fields: [...BASE_AUTH_FIELDS, ...REGISTER_ONLY_FIELDS],
};
