# Usa una imagen base oficial de Node.js
FROM node:22-alpine

# Instalar Git en Alpine
RUN apk add --no-cache git

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3100

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
