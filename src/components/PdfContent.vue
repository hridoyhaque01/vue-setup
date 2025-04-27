<template>
  <div id="app" ref="document">
    <div id="element-to-convert">
      <div class="bg-green-200 py-4 text-center">
        <h3>hello world</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Addons</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Premium Set 4444444</td>
              <td>
                A collection of premium Islamic books for comprehensive learning
                and understanding.
              </td>
              <td>3</td>
              <td>$49.99</td>
              <td>
                <ul>
                  <li>
                    <strong>Exclusive Bookmarks:</strong> $2.99 (Quantity: 1)
                  </li>
                  <li>
                    <strong>Personalized Cover:</strong> $5.99 (Quantity: 1)
                  </li>
                </ul>
              </td>
              <td>$1550.98</td>
            </tr>
            <tr>
              <td>Premium Set 4444444</td>
              <td>
                A collection of premium Islamic books for comprehensive learning
                and understanding.
              </td>
              <td>3</td>
              <td>$49.99</td>
              <td>
                <ul></ul>
              </td>
              <td>$147.00</td>
            </tr>
            <tr>
              <td>Premium Set 4444444</td>
              <td>
                A collection of premium Islamic books for comprehensive learning
                and understanding.
              </td>
              <td>2</td>
              <td>$49.99</td>
              <td>
                <ul>
                  <li>
                    <strong>Exclusive Bookmarks:</strong> $2.99 (Quantity: 1)
                  </li>
                  <li>
                    <strong>Personalized Cover:</strong> $5.99 (Quantity: 1)
                  </li>
                </ul>
              </td>
              <td>$106.98</td>
            </tr>
            <tr>
              <td>Premium Set 4444444</td>
              <td>
                A collection of premium Islamic books for comprehensive learning
                and understanding.
              </td>
              <td>1</td>
              <td>$49.99</td>
              <td>
                <ul></ul>
              </td>
              <td>$49.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button @click="exportToPDF">Export to PDF</button>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        image: { type: "jpeg", quality: 2 },
        filename: "i-was-html.pdf",
        html2canvas: {
          scale: 4,
        },
      });
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;
  text-align: center;
}

body {
  font-family: "Arial", sans-serif;
  margin: 20px;
}
h1 {
  color: #333;
}
.invoice-details {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.total {
  margin-top: 20px;
  text-align: right;
}
.footer {
  margin-top: 20px;
  font-size: 14px;
  color: #777;
}
</style>
