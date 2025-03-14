import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.tokenize import sent_tokenize
import re

def chunk_text(text, max_chunk_size=1000, overlap=200):
    """Split text into overlapping chunks."""
    # First try to split by natural paragraphs
    paragraphs = re.split(r'\n\s*\n', text)
    
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        if len(current_chunk) + len(para) < max_chunk_size:
            current_chunk += para + "\n\n"
        else:
            # If adding this paragraph would exceed max size, save current chunk
            if current_chunk:
                chunks.append(current_chunk.strip())
            
            # Start a new chunk with overlap from the previous chunk if possible
            if len(current_chunk) > overlap:
                overlap_text = current_chunk[-overlap:]
                current_chunk = overlap_text + para + "\n\n"
            else:
                current_chunk = para + "\n\n"
    
    # Don't forget the last chunk
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    # If chunks are too large, split further by sentences
    final_chunks = []
    for chunk in chunks:
        if len(chunk) > max_chunk_size:
            sentences = sent_tokenize(chunk)
            current_chunk = ""
            for sentence in sentences:
                if len(current_chunk) + len(sentence) < max_chunk_size:
                    current_chunk += sentence + " "
                else:
                    final_chunks.append(current_chunk.strip())
                    current_chunk = sentence + " "
            if current_chunk:
                final_chunks.append(current_chunk.strip())
        else:
            final_chunks.append(chunk)
    
    return final_chunks

def retrieve_relevant_chunks(query, chunks, top_k=5):
    """Retrieve the most relevant chunks for a query using TF-IDF and cosine similarity."""
    # Create TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    
    # Combine query and chunks for vectorization
    all_documents = chunks + [query]
    
    # Generate TF-IDF matrix
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_documents)
    
    # Get the query vector (last item in the matrix)
    query_vector = tfidf_matrix[-1]
    
    # Get document vectors (all except the last one)
    document_vectors = tfidf_matrix[:-1]
    
    # Calculate cosine similarity between query and all documents
    similarities = cosine_similarity(query_vector, document_vectors)[0]
    
    # Get indices of top_k most similar chunks
    top_indices = np.argsort(similarities)[-top_k:][::-1]
    
    # Return the top chunks joined together
    return "\n\n".join([chunks[i] for i in top_indices])