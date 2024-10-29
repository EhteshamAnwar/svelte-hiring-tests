<script lang="ts">
    // TODO: Implement form state management
    let formData: App.UserFormData ={
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    let formErrors: App.FormErrors = {}; //on error put values in it and remove if there are no errors
    let successMessage: App.FormSuccess = {}; 
    // TODO: Implement form validation //lets impliment this inside the submit function
    // TODO: Implement submit handler
    function handleSubmit() {
        formErrors = {};
        let validData = true;
        if(!formData.firstName)
        {
            formErrors.firstName = 'First Name is Required';
            validData = false;
        }
        if(!formData.lastName)
        {
            formErrors.lastName = 'Last Name is Required';
            validData = false;
        }

        if(!formData.email)
        {
            formErrors.email = 'Email is Required';
            validData = false;
            
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(formData.email)){
            formErrors.email = 'Email must be in valid format.';
            validData = false;
        }

        if(!formData.password)
        {
            formErrors.password = 'Password is Required';
            validData = false;
        }
        else if (formData.password.length < 6){
            formErrors.password = 'Password must be atleast 6 characters!';
            validData = false;
        }
        

        
        if(validData){
            // TODO: Implement success state management
            successMessage.firstName = formData.firstName;
            successMessage.lastName = formData.lastName;
            successMessage.email = formData.email;
            formData ={
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            };
        }
    }

    //clear error on typing
    const handleInput = (field: keyof App.UserFormData) => {
        formErrors[field] = undefined;
        successMessage ={};

        if (field === 'password' && formData.password.length < 6){
            formErrors.password = 'Password must be atleast 6 characters!';
        }

        if(field === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(formData.email)){
            formErrors.email = 'Email must be in valid format.';
        }
    }


</script>

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                bind:value={formData.firstName}
                class:error={formErrors.firstName}
                on:input={()=> handleInput('firstName')}
                
            />
            {#if formErrors.firstName}
                <span class="error-message" >{formErrors.firstName}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                bind:value={formData.lastName}
                class:error={formErrors.lastName}
                on:input={()=> handleInput('lastName')}
            />
            {#if formErrors.lastName}
                <span class="error-message" >{formErrors.lastName}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Enter your email"
                bind:value={formData.email}
                class:error={formErrors.email}
                on:input={()=> handleInput('email')}
                
            />
            {#if formErrors.email}
                <span class="error-message" >{formErrors.email}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Enter your password"
                bind:value={formData.password}
                class:error={formErrors.password}
                on:input={()=> handleInput('password')}
            />
            {#if formErrors.password}
                <span class="error-message" >{formErrors.password}</span>
            {/if}
        </div>

        <button type="submit" class="submit-button">Submit</button>
    </form>

    <!-- TODO: Add success message section here -->
     {#if successMessage.email}
        <div class="success-message">
            <h3>Successfully submitted:</h3>
            <p>First Name: {successMessage.firstName}</p>
            <p>Last Name: {successMessage.lastName}</p>
            <p>Email: {successMessage.email}</p>
        </div>
     {/if}
</div>

<style>
    .form-container {
        max-width: 480px;
        margin: 0 auto;
        padding: 2rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #D1D5DB;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.15s ease-in-out;
    }

    input:focus {
        outline: none;
        border-color: #3B82F6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input::placeholder {
        color: #9CA3AF;
    }

    input.error {
        border-color: #EF4444;
    }

    .error-message {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #EF4444;
    }

    .submit-button {
        width: 100%;
        padding: 0.75rem 1.5rem;
        background-color: #3B82F6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.15s ease-in-out;
    }

    .submit-button:hover {
        background-color: #2563EB;
    }

    .submit-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }

    .submit-button:disabled {
        background-color: #9CA3AF;
        cursor: not-allowed;
    }

    .success-message {
        margin-top: 1.5rem;
        padding: 1rem;
        background-color: #EDF7ED;
        border: 1px solid #C8E6C9;
        border-radius: 6px;
        color: #1B5E20;
    }
</style>