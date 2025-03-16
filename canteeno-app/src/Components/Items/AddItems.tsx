import { AddItem } from "../../Utils/apiUtils";
import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";

export const AddItems = () => {
  const handleAddItem = () => {
    AddItem();
  };
  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Items</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox placeholder="Add Item Name" />
            <InputBox placeholder="Add Item Description" />
            <InputBox placeholder="Add Item Price" />
            <InputBox placeholder="Add Item Quantity" />
            <InputBox placeholder="Add Item Image" />

            <Button onClick={handleAddItem} value="SUMBIT" />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
              <th>Item Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>
              <td>₹ 50</td>
              <td>10</td>
              <td>Image</td>
              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>
              <td>₹ 50</td>
              <td>10</td>
              <td>Image</td>
              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
