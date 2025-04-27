export function toggleDropdown(refs, selector = "dropdown") {
  console.log(refs);
  if (refs) {
    const dropdown = refs[selector];
    const isDropdownOpen = dropdown.classList.contains("dropdown-open");
    if (isDropdownOpen) {
      dropdown.classList.remove("dropdown-open");
    } else {
      dropdown.classList.add("dropdown-open");
    }
  } else {
    return;
  }
}

export function closeDropdown(event, refs, selector = "dropdown") {
  if (event && refs) {
    const dropdown = refs[selector];
    if (dropdown) {
      const isClickInsideDropdown = dropdown.contains(event.target);
      if (
        !isClickInsideDropdown &&
        dropdown.classList.contains("dropdown-open")
      ) {
        dropdown.classList.remove("dropdown-open");
      }
    } else {
      return;
    }
  } else {
    return;
  }
}
