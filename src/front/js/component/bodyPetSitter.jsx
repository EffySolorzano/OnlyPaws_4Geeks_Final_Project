// import React, { useContext, useState, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import "../../styles/sitter.css";
// import OnlyPaws from "../../img/onlypaws.png"

// const Sitter = () => {
//   const { store, actions } = useContext(Context);
//   const [lista, setLista] = useState();

//   useEffect(() => {
//     let funcionCarga = async () => {
//       let { respuestaJson, response } = await actions.useFetch(
//         "/apis/fake/contact/agenda/agenda_de_marce"
//       );
//       console.log(respuestaJson);
//       setLista(respuestaJson);
//     };
//     funcionCarga();
//   }, []);

//   useEffect(() => { }, [lista]);

//     return (
//       <>
//         <div className="card mt-4 mb-4 bg-dark border border-white">
//           <ul className="list-group list-group-flush bg-dark">
//             {lista && lista.length > 0 ? (
//               <>
//                 {lista.map((item, index) => {
//                   return (
//                     <li
//                       key={index}
//                       className="list-group-item d-flex mt-2 mb-2 p-2 bg-dark border-white"
//                     >
//                       <img
//                         src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
//                         className="rounded rounded-circle ms-5 me-5"
//                         style={{ width: "15%" }}
//                       />
//                       <div className="d-flex flex-column align-items-start col-8 text-light">
//                         <h5>{item.full_name}</h5>
//                         <div className="d-flex align-items-center text-light my-1">
//                           <i className="fa-solid fa-location-dot"></i>
//                           <span className="ms-3 fw-bold">{item.address}</span>
//                         </div>
//                         <div className="d-flex align-items-center text-light my-1">
//                           <i className="fa-solid fa-phone-flip"></i>
//                           <span className="ms-3" style={{ fontSize: "14px" }}>
//                             {item.phone}
//                           </span>
//                         </div>
//                         <div className="d-flex align-items-center text-light my-1">
//                           <i className="fa-solid fa-envelope"></i>
//                           <span className="ms-3" style={{ fontSize: "12px" }}>
//                             {item.email}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <Link to={"/edit-contact/" + item.id}>
//                           <i className="icon fa-solid fa-pencil bg-white p-2 rounded"></i>
//                         </Link>
//                         <i
//                           className="icon fa-solid fa-trash bg-white p-2 rounded ms-3"
//                           onClick={async () => {
//                             let deleteID = item.id;
//                             let { respuestaJson, response } =
//                               await actions.useFetch(
//                                 `/apis/fake/contact/${deleteID}`,
//                                 null,
//                                 "DELETE"
//                               );
//                             if (!response.ok) {
//                               console.log(response);
//                               return;
//                             }

//                             let newList = lista.slice();
//                             newList = newList.filter(
//                               (item) => item.id !== deleteID
//                             );
//                             setLista(newList);
//                             alert("Contacto eliminado con éxito");
//                           }}
//                         ></i>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </>
//             ) : (
//               <li className="list-group-item text-center">
//                 <h1>No hay contactos </h1>
//               </li>
//             )}
//           </ul>
//         </div>
//       </>
//     );
//   };

//   export default Sitter;
