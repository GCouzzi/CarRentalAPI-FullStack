package com.gsalles.carrental.service;

import com.gsalles.carrental.exception.FileNotFoundException;
import com.gsalles.carrental.exception.UploadContentTypeViolationException;
import com.gsalles.carrental.exception.UploadImageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImagemService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    public String salvarImagem(MultipartFile imagem) {

        String contentType = imagem.getContentType();

        if(contentType == null || !contentType.startsWith("image/")){
            throw new UploadContentTypeViolationException("O arquivo enviado não é uma imagem. (PDFs não são aceitos)");
        }

        try {
            Path root = Paths.get(uploadDir);
            Files.createDirectories(root);

            String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();

            Path destino = root.resolve(nomeArquivo);
            Files.copy(imagem.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + nomeArquivo;

        } catch (IOException e) {
            throw new UploadImageException("Erro ao salvar imagem: " + e.getMessage());
        }
    }

    public void deletarImagem(String imagemPath) {
        if (imagemPath == null) return;

        try {
            String nomeArquivo = imagemPath.replace("/uploads/", "");
            Path arquivo = Paths.get(uploadDir).resolve(nomeArquivo);
            Files.deleteIfExists(arquivo);

        } catch (IOException e) {
            throw new FileNotFoundException("Erro ao deletar imagem: " + e.getMessage());
        }
    }

    public String atualizarImagem(String imagemPathAtual, MultipartFile novaImagem) {
        deletarImagem(imagemPathAtual);
        return salvarImagem(novaImagem);
    }
}
