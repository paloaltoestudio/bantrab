import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Form() {
  // State for form inputs
  const [documentType, setDocumentType] = useState("cc");
  const [documentNumber, setDocumentNumber] = useState("");
  
  // Use useNavigate to redirect after submission
  const navigate = useNavigate();

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Usuario no encontrado",
      icon: "error"
    })
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = {
      documentType,
      documentNumber,
    };

    if(documentNumber == ''){
        showSwal()
    } else {
        try {
          const response = await fetch(`http://localhost:3000/api/persons/${documentNumber}`, {
            method: "GET"
          });
    
          if (response.status == 200) {
            console.log("Data submitted successfully");
            // Navigate to the next page after successful submission
            navigate("/photo");
          } else {
            showSwal()
            console.error("Failed to submit data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
    }

  };

  return (
    <div className="wrapper">
      <h2>Danos tus datos</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="cc">CC</option>
          <option value="nit">NIT</option>
        </select>
        <input
          type="text"
          placeholder="Número"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          required
        />
        <button className="link" type="submit">Siguiente</button>
      </form>
    </div>
  );
}
