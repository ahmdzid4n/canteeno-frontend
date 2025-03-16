import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";

export const AddStore = () => {
  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Store</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox placeholder="Add Store Name" />
            <InputBox placeholder="Add Store Location" />
            <InputBox placeholder="Add Store Contact" />

            <Button value="SUMBIT" />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Store Location</th>
              <th>Store Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Halvai</td>
              <td>Delhi</td>
              <td>1234567890</td>
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
