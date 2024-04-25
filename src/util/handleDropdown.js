export function toggleDropdown(refs) {
  const dropdown = refs.drop;
  const isDropdownOpen = dropdown.classList.contains("dropdown-open");
  if (isDropdownOpen) {
    dropdown.classList.remove("dropdown-open");
  } else {
    dropdown.classList.add("dropdown-open");
  }
}
export function closeDropdown(event, refs) {
  const dropdown = refs.drop;
  const isClickInsideDropdown = dropdown.contains(event.target);
  if (!isClickInsideDropdown && dropdown.classList.contains("dropdown-open")) {
    dropdown.classList.remove("dropdown-open");
  }
}
