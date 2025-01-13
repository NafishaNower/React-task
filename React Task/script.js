document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const addButton = document.getElementById('addFields');
    const formFields = document.getElementById('formFields');
    const stateTable = document.getElementById('stateTable').getElementsByTagName('tbody')[0];

    function createFieldGroup() {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';
        
        fieldGroup.innerHTML = `
            <div class="input-group">
                <input type="text" class="input-field" placeholder="Enter name">
                <select class="select-field">
                    <option value="">Select option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <button type="button" class="delete-btn">×</button>
            </div>
            <div class="error-messages">
                <span class="error input-error"></span>
                <span class="error select-error"></span>
            </div>
        `;

        const deleteBtn = fieldGroup.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            fieldGroup.remove();
            updateFormState();
        });

        return fieldGroup;
    }

    
    addButton.addEventListener('click', () => {
        formFields.appendChild(createFieldGroup());
    });

  
    function validateForm() {
        let isValid = true;
        const fieldGroups = formFields.getElementsByClassName('field-group');
        
        Array.from(fieldGroups).forEach(group => {
            const input = group.querySelector('.input-field');
            const select = group.querySelector('.select-field');
            const inputError = group.querySelector('.input-error');
            const selectError = group.querySelector('.select-error');
            
           
            inputError.textContent = '';
            selectError.textContent = '';
            
         
            if (!input.value.trim()) {
                inputError.textContent = 'Name is required';
                isValid = false;
            }
            
          
            if (!select.value) {
                selectError.textContent = 'Option is required';
                isValid = false;
            }
        });
        
        return isValid;
    }

  
    function updateFormState() {
        stateTable.innerHTML = '';
        const fieldGroups = formFields.getElementsByClassName('field-group');
        
        Array.from(fieldGroups).forEach((group, index) => {
            const input = group.querySelector('.input-field');
            const select = group.querySelector('.select-field');
            
            const row = stateTable.insertRow();
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = input.value;
            row.insertCell(2).textContent = select.value;
        });
    }

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            updateFormState();
        }
    });

    formFields.addEventListener('change', (e) => {
        if (e.target.classList.contains('input-field') || 
            e.target.classList.contains('select-field')) {
            updateFormState();
        }
    });

    updateFormState();
});