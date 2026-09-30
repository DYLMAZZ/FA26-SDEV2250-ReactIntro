import * as React from 'react';

const App = () => {

  const [items, setItems] = React.useState([
    { name: "Item 1", quantity: 0, cost: 0, total: 0 },
  ]);

  const [taxRate, setTaxRate] = React.useState(0);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Calculate total for each line
    if (field === "quantity" || field === "cost") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].cost;
    }

    setItems(updatedItems);
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return items.reduce((subtotal, item) => {
      return subtotal + item.total;
    }, 0);
  };

  // Calculate tax
  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (taxRate / 100);
  };

  // Calculate final total
  const calculateInvoiceTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();

    return subtotal + tax;
  };


  return (
    <div>
      <h3>Invoice Sheet</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate/Cost</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <LineItem
              key={index}
              item={item}
              onChange={(field, value) => handleItemChange(index, field, value)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <td>Sub Total:</td>
            <td>${calculateSubtotal().toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>
              Tax:
              <input
                type="number"
                value={taxRate}
                onChange={(e) =>
                  setTaxRate(Number(e.target.value) || 0)
                }
                style={{ width: "50px", marginLeft: "5px" }}
              />
              %
            </td>
            <td>${calculateTax().toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>Total</td>
            <td>${calculateInvoiceTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

    </div>
  )
}

const LineItem = (props) => {
  return (
    <tr>
      <td>
      <input
        type="text"
        placeholder="Item Name"
        value={props.item.name}
        onChange={(e) =>
          props.onChange("name",e.target.value)}/>
      </td>
      <td>
      <input
        type="number"
        placeholder="Quantity"
        value={props.item.quantity}
        onChange={(e) =>
          props.onChange("quantity",parseFloat(e.target.value))} />
      </td>
      <td>
      <input
        type="number"
        placeholder="Cost"
        value={props.item.cost}
        onChange={(e) =>
          props.onChange("cost",parseFloat(e.target.value))} />
      </td>
      <td>
        ${props.item.total}
      </td>
    </tr>
  )
}

export default App
