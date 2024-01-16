import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import axiosClient from "./../../config/axiosClient";
import { NavbarBrand } from "../../components/Navbar/NavbarBrand";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const getTurnos = async () => {
    try {
      const response = await axiosClient.get("/turnos");
      console.log('------------------------',response.data);
      setTurnos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTurno = async () => {
    try {
      await axiosClient.delete(`/turnos/${selected}`);
      setTurnos(turnos.filter((turno) => turno._id !== selected));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTurnos();
  }, []);

  const handleRowClick = (turnoId) => {
    setSelected(turnoId);
  };

  return (
    <>
      <NavbarBrand />
      <Container>
        <Button variant="success" onClick={handleShow} className="m-3">
          Agregar Turno
        </Button>
        <Button variant="warning" onClick={handleShowEdit} className="m-3">
          Editar Turno
        </Button>
        <Button variant="danger" onClick={deleteTurno} className="m-3">
          Borrar Turno
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Detalle Cita</th>
              <th>Usuario</th>
              <th>Veterinario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr
                key={turno._id}
                onClick={() => handleRowClick(turno._id)}
                // className={selected === turno._id ? "selected-row" : ""}
              >
                <td>{turno._id}</td>
                <td>{turno.detalleCita}</td>
                <td>{turno.user.nombre}</td>
                <td>{turno.veterinarian.nombre}</td>
                <td>{turno.fecha}</td>
                <td>{turno.hora}</td>
                <td>
                  <Link to={`/turno/${turno._id}`}>Ir a detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddModal show={show} handleClose={handleClose} setTurnos={setTurnos} turnos={turnos} />
        <EditModal
          show={showEdit}
          handleClose={handleCloseEdit}
          selected={selected}
          getTurnos={getTurnos}
        />
      </Container>
    </>
  );
};

export default Turnos;