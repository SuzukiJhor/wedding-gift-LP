CREATE TABLE public.guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- O nome continua obrigatório
  
  -- Email opcional (basta não colocar NOT NULL)
  email TEXT UNIQUE, 
  
  -- Número de convidados opcional com valor padrão 1
  guests_count INTEGER DEFAULT 1, 
  
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);