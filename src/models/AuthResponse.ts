
 export interface AuthResponse {
    
    id: number;  
    nome: string;
    email: string;
    foto?: string;
    token: string;
    refreshToken?: string;
  } 