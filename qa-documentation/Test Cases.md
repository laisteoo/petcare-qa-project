# PetCare Test Cases

Manual test cases for the PetCare appointment scheduling application. The table includes scenarios, preconditions, steps, expected and actual results, and execution status.

**Records:** 19

| ID | Test Scenario | Precondition | Test Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| CT-001 | Register a customer with valid data | User is not registered | Fill in all required fields with valid data and submit the form | Customer should be registered successfully | Customer was registered correctly | Passed |
| CT-002 | Register a customer with required fields empty | User is on the registration screen | Leave the required fields empty and attempt to register | System should identify the fields that must be completed | System identifies the fields that need to be completed | Passed |
| CT-003 | Log in with valid credentials | Customer is registered | Enter the correct email and password, then log in | User should access their account | User accesses the account successfully | Passed |
| CT-004 | Register a pet with valid data | Customer is authenticated | Enter the pet's name, species, and size, then save | Pet should be registered successfully | User successfully registers the pet | Passed |
| CT-005 | Register a pet without required information | Customer is authenticated | Leave one or more required fields empty and save | System should prevent registration and identify the required fields | System allows registration without completing the required fields | Failed |
| CT-006 | Schedule an appointment without a registered pet | Customer is authenticated and has no registered pets | Attempt to schedule an appointment | System should prevent the appointment and request pet registration | System allows an appointment to be scheduled even though no pet is registered to the user account | Failed |
| CT-007 | Schedule an appointment without selecting a service | Customer is authenticated and has a registered pet | Select a pet, date, and time without selecting a service | System should prevent confirmation and request service selection | System prevents confirmation and asks the user to select a service | Passed |
| CT-008 | Schedule an appointment with a valid service, date, and time | Customer is authenticated and has a registered pet | Select an available pet, service, date, and time, then confirm | Appointment should be scheduled successfully | System allows the appointment to be scheduled | Passed |
| CT-009 | Select an unavailable time slot | Customer is authenticated | Try to select a time slot that is already occupied | System should not allow the time slot to be selected | System allows the already occupied time slot to be selected | Failed |
| CT-010 | Schedule an appointment for a past date | Customer is authenticated and has a registered pet | Attempt to schedule an appointment for a date earlier than today | System should prevent the appointment | System successfully prevents scheduling for a past date | Passed |
| CT-011 | Schedule two appointments for the same pet at the same time | Pet already has an appointment | Attempt to create another appointment for the same pet and time | System should prevent the second appointment | System successfully prevents the second appointment | Passed |
| CT-012 | Review appointment details before confirmation | Customer has selected a service, pet, date, and time | Proceed to the confirmation step | System should correctly display the appointment details before confirmation | System correctly displays the appointment details before confirmation | Passed |
| CT-013 | Confirm an appointment | Customer has provided valid data | Confirm the appointment after reviewing the details | System should display the confirmation and appointment details | System correctly displays the confirmation and appointment details | Passed |
| CT-014 | View appointments | Customer has an appointment | Open the appointments area | System should display the customer's appointments | System does not display appointments already made by the user | Failed |
| CT-015 | Reschedule an appointment | Customer has an appointment | Select an appointment and change its date or time to an available option | System should update the appointment correctly | Blocked | Blocked |
| CT-016 | Cancel an appointment | Customer has an appointment | Select an appointment and request cancellation | System should cancel the appointment and update its status | Blocked | Blocked |
| CT-017 | Register a pet with a name at the maximum length | Customer is authenticated | Enter a name containing exactly 50 characters and correctly complete the other fields | System should register the pet successfully | System allowed registration of a pet with a name containing exactly 50 characters | Passed |
| CT-018 | Register a pet with a name exceeding the maximum length | Customer is authenticated | Enter a name containing 51 characters and correctly complete the other fields | System should prevent registration and indicate that the name can contain no more than 50 characters | System allowed registration of a pet with a 51-character name, exceeding the defined maximum | Failed |
| CT-019 | Register a pet with a name consisting only of spaces | Customer is authenticated | Enter only spaces in the name field and complete the other fields | System should prevent registration and indicate that the name is required | System allowed registration of a pet with a name field containing only spaces | Failed |

 [Back to QA Documentation](README.md)
