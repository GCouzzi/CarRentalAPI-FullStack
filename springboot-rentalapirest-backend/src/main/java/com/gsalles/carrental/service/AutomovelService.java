package com.gsalles.carrental.service;

import com.gsalles.carrental.dto.AutomovelDTO;
import com.gsalles.carrental.dto.rdto.AutomovelResponseDTO;
import com.gsalles.carrental.entity.Automovel;
import com.gsalles.carrental.exception.AutomovelStatusUniqueViolationException;
import com.gsalles.carrental.exception.AutomovelUniqueViolationException;
import com.gsalles.carrental.exception.EntityNotFoundException;
import com.gsalles.carrental.repository.AutomovelRepository;
import com.gsalles.carrental.repository.specifications.AutomovelSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutomovelService {

    private final AutomovelRepository repository;
    private final ImagemService imagemService;

    @Transactional
    public Automovel salvar(Automovel automovel) {
        if (repository.findByPlaca(automovel.getPlaca()).isPresent()) {
            throw new AutomovelUniqueViolationException("Placa já registrada");
        }
        return repository.save(automovel);
    }

    @Transactional(readOnly = true)
    public Automovel buscarPorPlaca(String placa) {
        return repository.findByPlaca(placa).orElseThrow(
                () -> new EntityNotFoundException("Placa não encontrada.")
        );
    }

    @Transactional(readOnly = true)
    public Automovel buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Id não encontrado.")
        );
    }

    @Transactional
    public void deleteByPlaca(String placa) {
        Automovel automovel = repository.findByPlaca(placa)
                .orElseThrow(() -> new EntityNotFoundException("Placa não encontrada."));
        imagemService.deletarImagem(automovel.getImagemPath());
        repository.delete(automovel);
    }

    @Transactional(readOnly = true)
    public List<Automovel> buscarTodosLivres() {
        return repository.findByStatus(Automovel.Status.LIVRE);
    }

    @Transactional(readOnly = true)
    public Page<Automovel> buscarTodos(Automovel.Status status, String marca, String modelo, Pageable pageable) {
        Specification<Automovel> spec = Specification
                .where(status != null ? AutomovelSpecification.status(status) : null)
                .and((marca != null && !marca.isBlank()) ? AutomovelSpecification.marca(marca) : null)
                .and((modelo != null && !modelo.isBlank()) ? AutomovelSpecification.modelo(modelo) : null);
        return repository.findAll(spec, pageable);
    }

    @Transactional
    public Automovel updateByPlaca(String placa, Automovel.Status status){
        if(status == Automovel.Status.ALUGADO){
            throw new AutomovelStatusUniqueViolationException("Não é possível alterar o status de um automóvel para alugado.");
        }
        Automovel a = repository.findByPlaca(placa).orElseThrow(() -> new EntityNotFoundException("Placa não encontrada."));
        if(a.getStatus() == Automovel.Status.ALUGADO){
            throw new AutomovelStatusUniqueViolationException("Não é possível alterar o status de um automóvel alugado.");
        }
        a.setStatus(status);
        return repository.save(a);
    }

    @Transactional
    public Automovel updateByPlaca(String placa, AutomovelDTO dto, MultipartFile imagem) {
        Automovel automovel = repository.findByPlaca(placa).orElseThrow(() -> new EntityNotFoundException("Placa não encontrada."));

        automovel.setMarca(dto.getMarca());
        automovel.setModelo(dto.getModelo());
        automovel.setCor(dto.getCor());
        automovel.setPlaca(dto.getPlaca());
        automovel.setValorPorMinuto(dto.getValorPorMinuto());

        if (imagem != null) {
            String novoPath = imagemService.atualizarImagem(automovel.getImagemPath(), imagem);
            automovel.setImagemPath(novoPath);
        }

        return repository.save(automovel);
    }
}
