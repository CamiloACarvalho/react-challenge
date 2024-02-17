// Tipagem das informações da API
export type mainInformation ={
  count: number;
  pages: number;
  totalPages: number;
  nextPages: number;
  previousPages: number;
  showingFrom: number;
  showingTo: number;
  items: Array<object>;
}

// Tipagem das informações da notícia
export type notice = {
  id: number;
  tipo: string;
  titulo: string;
  introducao: string;
  data_publicacao: string;
  produto_id: number;
  produtos: string;
  editorias: string;
  imagens: string;
  imageUrl: string; 
  produtos_relacionados: string;
  destaque: boolean;
  link: string;
}