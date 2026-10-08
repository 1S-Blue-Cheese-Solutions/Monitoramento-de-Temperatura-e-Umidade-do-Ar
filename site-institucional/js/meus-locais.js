const STORAGE_KEY = "bluecheese_meus_locais_v1";
const initialData = [
  {
    id: "c1",
    name: "Laticínios Serra Azul",
    cnpj: "12.345.678/0001-90",
    addresses: [
      {
        id: "a1",
        street: "Rua das Acácias, 120",
        city: "Serro - MG",
        rooms: [
          { id: "r1", name: "Sala de Maturação 1" },
          { id: "r2", name: "Sala de Maturação 2" },
        ],
      },
      {
        id: "a2",
        street: "Avenida Tiradentes, 845",
        city: "Poços de Caldas - MG",
        rooms: [],
      },
    ],
  },
  {
    id: "c2",
    name: "Queijaria Veia Azul",
    cnpj: "23.456.789/0001-01",
    addresses: [
      {
        id: "a3",
        street: "Estrada do Queijo Artesanal, 51",
        city: "Araxá - MG",
        rooms: [{ id: "r3", name: "Sala de Cura Gorgonzola" }],
      },
    ],
  },
];
let companies;
try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
  companies = Array.isArray(stored) ? stored : structuredClone(initialData);
} catch {
  companies = structuredClone(initialData);
}
const list = document.getElementById("empresas");
const dialog = document.getElementById("editorDialog");
const form = document.getElementById("editorForm");
const fields = document.getElementById("dialogFields");
let editing = null;
const uid = () => crypto.randomUUID?.() ?? String(Date.now()) + Math.random();
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  render();
}
function node(tag, cls, txt) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== undefined) el.textContent = txt;
  return el;
}
function action(text, action, companyId, addressId, cls = "locais-link") {
  const b = node("button", cls, text);
  b.type = "button";
  b.dataset.action = action;
  if (companyId) b.dataset.company = companyId;
  if (addressId) b.dataset.address = addressId;
  return b;
}
function render() {
  list.replaceChildren();
  if (!companies.length) {
    list.append(
      node(
        "p",
        "locais-no-companies",
        'Nenhuma empresa cadastrada. Clique em "+ Nova empresa" para começar.',
      ),
    );
    return;
  }
  for (const company of companies) {
    const section = node("section", "locais-company");
    const head = node("div", "locais-company-heading");
    const details = node("div");
    details.append(
      node("h2", "", company.name),
      node("p", "", "CNPJ " + company.cnpj),
    );
    const actions = node("div", "locais-company-actions");
    actions.append(
      action("Editar empresa", "edit-company", company.id),
      action(
        "+ Novo endereço",
        "add-address",
        company.id,
        null,
        "locais-button outlined",
      ),
    );
    head.append(details, actions);
    section.append(head);
    const cards = node("div", "locais-addresses");
    for (const address of company.addresses) {
      const card = node("article", "locais-address-card");
      const cardHead = node("div", "locais-address-heading");
      const titleWrap = node("div");
      titleWrap.append(
        node("h3", "", address.street),
        node("p", "", address.city),
      );
      cardHead.append(
        titleWrap,
        action("Editar", "edit-address", company.id, address.id),
      );
      card.append(cardHead, node("div", "locais-divider"));
      if (address.rooms.length) {
        const ul = node("ul", "locais-rooms");
        for (const room of address.rooms) ul.append(node("li", "", room.name));
        card.append(ul);
      } else
        card.append(node("p", "locais-empty", "Nenhum ambiente cadastrado."));
      card.append(
        action(
          "+ Adicionar ambiente",
          "add-room",
          company.id,
          address.id,
          "locais-add-room",
        ),
      );
      cards.append(card);
    }
    section.append(cards);
    list.append(section);
  }
}
function findCompany(id) {
  return companies.find((c) => c.id === id);
}
function field(name, label, value = "", required = true) {
  const wrapper = node("label", "locais-field");
  wrapper.append(document.createTextNode(label));
  const input = document.createElement("input");
  input.name = name;
  input.value = value;
  input.required = required;
  input.maxLength = 130;
  wrapper.append(input);
  return wrapper;
}
function openEditor(actionName, companyId, addressId) {
  const company = findCompany(companyId),
    address = company?.addresses.find((a) => a.id === addressId);
  editing = { actionName, companyId, addressId };
  fields.replaceChildren();
  let title = "";
  if (actionName === "add-company" || actionName === "edit-company") {
    title = actionName === "add-company" ? "Nova empresa" : "Editar empresa";
    fields.append(
      field("name", "Nome da empresa", company?.name ?? ""),
      field("cnpj", "CNPJ", company?.cnpj ?? ""),
    );
  } else if (actionName === "add-address" || actionName === "edit-address") {
    title = actionName === "add-address" ? "Novo endereço" : "Editar endereço";
    fields.append(
      field("street", "Logradouro e número", address?.street ?? ""),
      field("city", "Cidade e estado (ex.: Serro - MG)", address?.city ?? ""),
    );
  } else if (actionName === "add-room") {
    title = "Adicionar ambiente";
    fields.append(field("name", "Nome do ambiente"));
  }
  document.getElementById("dialogTitle").textContent = title;
  dialog.showModal();
  fields.querySelector("input")?.focus();
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const {
    action: actionName,
    company: companyId,
    address: addressId,
  } = btn.dataset;
  openEditor(actionName, companyId, addressId);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!editing) return;
  const data = Object.fromEntries(new FormData(form));
  for (const key in data) data[key] = data[key].trim();
  const { actionName, companyId, addressId } = editing;
  const company = findCompany(companyId),
    address = company?.addresses.find((a) => a.id === addressId);
  if (actionName === "add-company")
    companies.push({
      id: uid(),
      name: data.name,
      cnpj: data.cnpj,
      addresses: [],
    });
  if (actionName === "edit-company" && company)
    Object.assign(company, { name: data.name, cnpj: data.cnpj });
  if (actionName === "add-address" && company)
    company.addresses.push({
      id: uid(),
      street: data.street,
      city: data.city,
      rooms: [],
    });
  if (actionName === "edit-address" && address)
    Object.assign(address, { street: data.street, city: data.city });
  if (actionName === "add-room" && address)
    address.rooms.push({ id: uid(), name: data.name });
  dialog.close();
  editing = null;
  form.reset();
  save();
});
document
  .getElementById("closeDialog")
  .addEventListener("click", () => dialog.close());
document
  .getElementById("cancelDialog")
  .addEventListener("click", () => dialog.close());
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  const opened = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
render();
