import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import axiosInstance from "../../Utils/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../Common/Slices/ErrorMessage";


export type StoreType = {
  storeId: number;
  name: string;
  location: string;
  contactInfo: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export const AddStore = () => {
  const dispatch = useDispatch();
  const [storeList, setStoreList] = useState<StoreType[]>([]);
  const [storeName, setStoreName] = useState<string>("");
  const [storeLocation, setStoreLocation] = useState<string>("");
  const [storeContact, setStoreContact] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState<number | null>();
  const [showForm, setShowForm] = useState(false); // ✅ Toggle form visibility

  useEffect(() => {
    getStoreList();
  }, []);

  const getStoreList = () => {
    // Fetch store list from the server
    axiosInstance
      .get("http://localhost:8080/api/catalog/store")
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          setStoreList(res.data);
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStoreSubmit = () => {
    if (isEdit) {
      axiosInstance
        .put(`http://localhost:8080/api/catalog/store`, {
          storeId: editingStoreId,
          name: storeName,
          location: storeLocation,
          contactInfo: storeContact,
        })
        .then((res) => {
          if (res.status === 200 && !res.data.errorCode) {
            getStoreList();
            setStoreName("");
            setStoreLocation("");
            setStoreContact("");
            setIsEdit(false);
            setEditingStoreId(null);
          } else {
            dispatch(setErrorMessage(res.data.message));
          }
        });
      return;
    }
    axiosInstance
      .post("http://localhost:8080/api/catalog/store", {
        name: storeName,
        location: storeLocation,
        contactInfo: storeContact,
      })
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          getStoreList();
          setStoreName("");
          setStoreLocation("");
          setStoreContact("");
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  const handleDeleteStore = (storeId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/catalog/store/${storeId}`)
      .then((res) => {
        if (res.status === 204 && !res.data.errorCode) {
          getStoreList();
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  const handleStoreUpdate = (storeId: number) => {
    axiosInstance
      .get(`http://localhost:8080/api/catalog/store/${storeId}`)
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          setStoreName(res.data.name);
          setStoreLocation(res.data.location);
          setStoreContact(res.data.contactInfo);
          setIsEdit(true);
          setEditingStoreId(storeId);
          setShowForm(true); // ✅ Show form when editing
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };
  
  const resetForm = () => {
    setStoreName("");
    setStoreLocation("");
    setStoreContact("");
    setIsEdit(false);
    setEditingStoreId(null);
    setShowForm(false); // ✅ Hide form after submission
  };

  return (
    <>
    <div className="admin-content-display-section">
        <div className="header-section">
            <h2>STORES</h2>
            <Button value="Add New Store" onClick={() => setShowForm(true)} />
        </div>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>LOCATION</th>
                    <th>PHONE</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {storeList.map((store, index) => (
                <tr key={store.storeId}>
                    <td>{index + 1}</td>
                    <td>{store.name}</td>
                    <td>{store.location}</td>
                    <td>{store.contactInfo}</td>
                    <td>
                        <Button
                    value="Edit"
                    onClick={() => handleStoreUpdate(store.storeId)}
                  />
                  <Button
                    value="Delete"
                    onClick={() => handleDeleteStore(store.storeId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Store Form Section */}
      {showForm && (
        <div className="admin-content-entry-section">
          <div className="admin-content-entry-section-inner">
            <h2>{isEdit ? "Edit Store" : "Add Store"}</h2>
            <div className="admin-content-entry-section-inner-form">
              <InputBox
                placeholder="Store Name"
                value={storeName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value)}
              />
              <InputBox
                placeholder="Store Location"
                value={storeLocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoreLocation(e.target.value)}
              />
              <InputBox
                placeholder="Store Contact"
                value={storeContact}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoreContact(e.target.value)}
              />

              <Button value={isEdit ? "Update" : "Submit"} onClick={handleStoreSubmit} />
              <Button value="Cancel" onClick={resetForm} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
