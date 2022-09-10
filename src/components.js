const UserProductFormContent = (
  element,
  formTitle,
  formImage,
  formfields,
  handleSubmit
) => {
  element.addEventListener("submit", handleSubmit);
  return `
    <div class="col-8 offset-2">
    <h5><i class="${formImage} me-2"></i>${formTitle}</h5>
    ${formfields
      .map(
        (field) =>
          `<label class="form-label" for="${field.name}">${field.title}<input class="form-control form-control-sm" id="${field.name}" type="${field.type}" /></label>`
      )
      .join(" ")}
    </div>
    <div class="d-grid col-8 offset-2">
      <button class="btn btn-primary mt-2" type="submit">Save</button>
    </div>
      `;
};
const TrasferSalesFormContent = (element, template, handleSubmit) => {
  element.addEventListener("submit", handleSubmit);
  return `
    <h5>${template.title}</h5>
    ${template.fields
      .map(
        (field) =>
          `<div class="col-3">
        <label class="form-label">
          ${field.title}
          ${
            field.type === "select"
              ? `<select id="${field.id}" class="form-select form-select-sm ${field.options}">
              <option selected>Choose...</option>
            </select>`
              : `<input id="${field.id}" class="form-control form-control-sm" type=${field.type} />`
          }
        </label>
      </div>`
      )
      .join(" ")}
    <div class="col-3 d-grid">
      <button type="submit" class="btn btn-primary">
        ${template.buttonName} <i class="bi bi-box-arrow-in-right"></i>
      </button>
    </div>`;
};
