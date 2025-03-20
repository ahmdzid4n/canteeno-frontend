import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import axiosInstance from "../../Utils/axiosConfig";
import { useEffect, useState } from "react";
import { setErrorMessage } from "../../Common/Slices/ErrorMessage";
import { useDispatch } from "react-redux";

export type CategoryType = {
  categoryId: number;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string; // Consider using `Date` if you plan to handle date objects
  updatedBy: string;
  updatedAt: string; // Consider using `Date` if you plan to handle date objects
};

export const AddCategories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>();

  const getCategoryList = () => {
    axiosInstance
      .get("http://localhost:8080/api/catalog/category")
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          setCategories(res.data);
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
    // Fetch category list from the server
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleCategorySubmit = () => {
    if (isEdit) {
      axiosInstance
        .put(`http://localhost:8080/api/catalog/category`, {
          categoryId: editingCategoryId,
          name: categoryName,
          description: categoryDescription,
        })
        .then((res) => {
          if (res.status === 200 && !res.data.errorCode) {
            getCategoryList();
            setCategoryName("");
            setCategoryDescription("");
            setIsEdit(false);
            setEditingCategoryId(null);
          } else {
            dispatch(setErrorMessage(res.data.message));
          }
        });
      return;
    }
    axiosInstance
      .post("http://localhost:8080/api/catalog/category", {
        name: categoryName,
        description: categoryDescription,
      })
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          getCategoryList();
          setCategoryName("");
          setCategoryDescription("");
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  const handleDeleteCategory = (categoryId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/catalog/category/${categoryId}`)
      .then((res) => {
        if (res.status === 204 && !res.data.errorCode) {
          getCategoryList();
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  const handleUpdateCategory = (categoryId: number) => {
    axiosInstance
      .get(`http://localhost:8080/api/catalog/category/${categoryId}`)
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          setCategoryName(res.data.name);
          setCategoryDescription(res.data.description);
          setIsEdit(true);
          setEditingCategoryId(categoryId);
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Categories</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox
              placeholder="Add Categories Name"
              value={categoryName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryName(e.target.value)
              }
            />
            <InputBox
              placeholder="Add Categories Description"
              value={categoryDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryDescription(e.target.value)
              }
            />

            <Button value="SUMBIT" onClick={handleCategorySubmit} />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.categoryId}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Button
                    value="Edit"
                    onClick={() => handleUpdateCategory(category.categoryId)}
                  />
                  <Button
                    value="Delete"
                    onClick={() => handleDeleteCategory(category.categoryId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
