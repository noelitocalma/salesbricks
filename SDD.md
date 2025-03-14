# Order Module Software Design Document

This document outlines the design for an **Order Module**. 
The document will cover the following:

1. **UI Designs/Components**:
    - A web-based interface to allow sellers to input customer information, select products, define contract terms, and finalize the order.
    - It will be developed using **NEXT.JS** and **TailwindCSS** for a responsive and interactive experience, utilizing **Jotai** for state management.
    - Create a Wizard component which will have a next and prev button
      - disable the next button if there are validation error on the current step
      - make each step header clickable (optional)
    - Main Components per stage/step:
      - Stage 1: Customer Information  
        - Customer Name (required)
        - Customer company address (optional)
        - Customer Address (Pre-populate customer information is checked)
          - Address Line 1
          - Address Line 2 (optional)
          - City
          - State
          - Zip Code
      - Stage 2: Product and Plan Selection
        - Product (required)
        - Product Plan (required)
      - Stage 3: Contract Terms
        - Start Date (required - must be  current or future date)
        - Contract Period
          - 6 months
          - 12 months
          - 24 months
          - 36 months
          - Custom (if selected)
            - then show an input number field
            - minimum/default value is 1
          - End Date (auto calculated based on start date and contract period)
        - Stage 4: Review & Fine Tune
          - combine all the details from Stage 1 to Stage 3
          - Addons (optional)
            - minimum quantity per addon should be 1 (one).
            - add a validation for the maximum quanity per addon (if applicable)
            - show total amount

2. **Frontend (Tech Stack)**:
    - **NEXT.JS**: For building the dynamic user interface.
    - **Jotai**: To manage the application's state and data flow across different components.
    - **shadcn/ui**: A set of beautifully-designed, accessible components and a code distribution platform.

3. **Data Models**:
   - Customer Information Model:
     ```typescript
     interface Customer {
       id?: string;
       name: string;
       addressLine1: string;
       addressLine2?: string;
       city: string;
       state: string;
       zipCode: string;
     }
     ```

   - Product and Plan Model:
     ```typescript
     interface Product {
       id: string;
       name: string;
       plans: ProductPlan[]
     }

     enum ProductPlanTerm {
       Monthly = 'mo',
       Yearly = 'yr'
     }

     interface ProductPlan {
       id: string;
       name: string;
       price: number;
       currency: string;
       term: ProductPlanTerm; 
     }
     ```

   - Contract Terms Model:
     ```typescript
     enum ContractDuration {
       SixMonths = 6,
       TwelveMonths = 12,
       TwentyFourMonths = 24,
       ThirtySixMonths = 36,
       Custom = "custom"
     }

     interface Contract {
       startDate: string;
       endDate: string;
       contractPeriod: ContractDuration;
       customValue?: number;
     }
     ```

   - Addons Model:
     ```typescript
     interface AddOn {
       id: string;
       name: string;
       price: number;
       currency: string;
       description: string;
       quantity: number;
     }
     ```

   - Order Model:
     ```typescript
      interface Order {
        customer: Customer;
        populateCustomerInfo: boolean;
        product: Product;
        selectedProductPlan: ProductPlan; 
        contract: Contract;
        addOns: AddOn[];
        status: 'pending' | 'completed' | 'shipped';
        totalAmount: number;
      }
     ```

4. **Risks**:
    - If the user will just input the address manually, we should validate each field just to make sure the address exists.
    - Do we need to add a max quantity on the addon?

5. **Timeline**:
    - Development of the UI components: 1 - 2 days
    - Testing: 1 day
    - Implementation and Go Live
