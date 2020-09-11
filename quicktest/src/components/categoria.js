import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import axios from "axios";

function Categoria() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getData();
    };
    fetchData();
  }, []);

  const onHideModal = () => {
    setModal(false);
  };

  const clickAqui = (categoria) => {
    console.log(categoria);
    setModal(true);
    if (categoria === "oro")
      setModalInfo({ categoria: categoria.toUpperCase(), cantidad: data.gold });
    if (categoria === "plata")
      setModalInfo({
        categoria: categoria.toUpperCase(),
        cantidad: data.silver,
      });
    if (categoria === "bronce")
      setModalInfo({
        categoria: categoria.toUpperCase(),
        cantidad: data.bronze,
      });
  };

  const getData = async () => {
    let goldTotal = 0;
    let silverTotal = 0;
    let bronzeTotal = 0;
    const res = await axios(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json"
    );
    if (res) {
      res.data.forEach((r) => {
        goldTotal += r.gold;
        silverTotal += r.silver;
        bronzeTotal += r.bronze;
      });
    }

    setData({ gold: goldTotal, silver: silverTotal, bronze: bronzeTotal });
  };

  return (
    <div>
      <div id="modal-div">
        <Modal size="lg" show={modal} onHide={() => onHideModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Categoria: {modalInfo.categoria}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
              <b>Muchas medallas: </b> {modalInfo.cantidad} <br></br>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="row">
        <div className="col-md-4 p-2">
          <div className="card" onClick={() => clickAqui("oro")}>
            <div className="card-header d-flex justify-content-between">
              <h2>
                <FontAwesomeIcon
                  icon="medal"
                  style={{ color: "#FFD133" }}
                  fixedWidth
                />
                Oro
              </h2>
              <h2>{data.gold}</h2>
            </div>
          </div>
          <div className="card" onClick={() => clickAqui("plata")}>
            <div className="card-header d-flex justify-content-between">
              <h2>
                <FontAwesomeIcon
                  icon="medal"
                  style={{ color: "#B0B6B5" }}
                  fixedWidth
                />
                Plata
              </h2>
              <h2>{data.silver}</h2>
            </div>
          </div>
          <div className="card" onClick={() => clickAqui("bronce")}>
            <div className="card-header d-flex justify-content-between">
              <h2>
                <FontAwesomeIcon
                  icon="medal"
                  style={{ color: "#CE9824" }}
                  fixedWidth
                />
                Bronce
              </h2>
              <h2>{data.bronze}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Categoria);
