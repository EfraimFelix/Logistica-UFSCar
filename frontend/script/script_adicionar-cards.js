function adicionarComentario() {
	const comentariosDiv = document.getElementById("comentarios")
	const novoComentarioTexto = document.getElementById("novoComentario").value

	if (novoComentarioTexto.trim() === "") {
		alert("O comentário não pode estar vazio!")
		return
	}

	const novoComentario = document.createElement("div")
	novoComentario.classList.add("comentario")
	novoComentario.textContent = novoComentarioTexto

	comentariosDiv.appendChild(novoComentario)

	document.getElementById("novoComentario").value = ""
}
