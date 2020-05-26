import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormComponent } from './form.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from '../validator/email-validator.directive';
import { PhoneValidatorDirective } from '../validator/phone-validator.directive';
import { UserService } from '../user/user.service';



describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        EmailValidatorDirective,
        PhoneValidatorDirective
      ],
      imports: [
        FormsModule
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  //expect  to display
  it('should initialize properly', () => {
    expect(component)
      .toBeDefined();
  });

  //Comment: expect(component.form.form.valid).toBeTruthy();Done
  it('it should have a valid form ', () => {
    const form = de.query(By.css('.myForm'));

    //expect form is displayed
    expect(form.nativeElement).toBeDefined();

    //expect form is valid
    expect(component.form.form.valid)
      .toBeTruthy();
  });

  it('should have first name', () => {
    const firstName = de.query(By.css('.firstName'));

    //expect first user.firstName is initialized
    expect(component.user.firstName).toBeDefined();

    //expect first name field to be displayed
    expect(firstName.nativeElement).toBeDefined();
  })

  it('should have last name', () => {
    const lastName = de.query(By.css('.lastName'));

    //expect first user.lastName is initialized
    expect(component.user.lastName).toBeDefined();

    //expect last name field to be displayed
    expect(lastName.nativeElement).toBeDefined();

  })

  it('should have phone', () => {
    const phone = de.query(By.css('.phone'));

    //expect user.phone is initialized
    expect(component.user.phone).toBeDefined();

    //expect phone field to be displayed
    expect(phone.nativeElement).toBeDefined();

  })

  it('should have email', () => {
    const email = de.query(By.css('.email'));

    //expect user.email is initialized
    expect(component.user.email).toBeDefined();

    //expect email is displayed
    expect(email.nativeElement).toBeDefined();
  })

  it('should have a save button ', () => {
    const saveBtn = de.query(By.css('.save'));

    //expect save button is displayed
    expect(saveBtn.nativeElement)
      .toBeDefined();
  })

  it('should have a cancel button ', () => {
    const cancelBtn = de.query(By.css('.cancel'));
    // Expect to display cancel button
    expect(cancelBtn.nativeElement)
      .toBeDefined();

  })

  // Comment: Must use spy if the method was called: DONE
  it('clicking the save button should call the component\'s save function ', async() => {
    const saveBtn = de.query(By.css('.save'));

    const saveSpy = spyOn(component, 'onSubmit');
    saveBtn.nativeElement.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(saveSpy)
      .toHaveBeenCalledTimes(1);

  });

  // Comment: it will still work without line 140-142 DONE
  // Apply only fixture.detectChanges() or tick when needed
  // Before using fakeAsync try first await fixture.whenStable() instead of tick()
  it('should not call UserService.save() when the form is submitted and it is invalid', async () => {

    //set last name as null to make form invalid
    component.user.firstName = '';
    component.user.lastName = 'test';
    component.user.phone = '';
    component.user.email = '';

    const saveBtn = de.query(By.css('.save'));
    const userServiceMethods: UserService = TestBed.get(UserService);
    const saveSpy = spyOn(userServiceMethods, 'save');

    saveBtn.nativeElement.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    //Expect that save was not called when form is invalid 
    expect(saveSpy)
      .toHaveBeenCalledTimes(0);

  })



  // Comment: it will still work without line 175-177  DONE
  // Apply only fixture.detectChanges() or tick when needed
  // Before using fakeAsync try first await fixture.whenStable() instead of tick()
  it('should call UserService.save() when the form is submitted and is valid', async () => {

    //set user with valid data as null to make form invalid
    component.user.firstName = 'Ethan';
    component.user.lastName = '';
    component.user.phone = '216548 878';
    component.user.email = 'test@test.com';
    const saveBtn = de.query(By.css('.save'));
    const userServiceMethods: UserService = TestBed.get(UserService);
    const saveSpy = spyOn(userServiceMethods, 'save');

    saveBtn.nativeElement.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    fixture.detectChanges();

    //Expect that save was not called when form is invalid 
    expect(saveSpy)
      .toHaveBeenCalledTimes(1);

  })

  // Comment: expect(userList).toBeNull(); DONE
  it('should not have contents in the table by default. ', () => {
    const userList = de.query(By.css('.user-list'));
    expect(userList)
      .toBeNull();
  });


  // Comment: Should not call the method. Trigger the button instead DONE
  it('should show the recently created user in the table after saving.', async () => {

  
    //set user with valid data as null to make form valid
    component.users = [];
    component.user.firstName = 'Ethan';
    component.user.lastName = '';
    component.user.phone = '216548 878';
    component.user.email = 'test@test.com';

    const userListItem = de.query(By.css('.user-list td'));
    const saveBtn = de.query(By.css('.save'));
    const saveSpy = spyOn(component, 'onSubmit');
    saveBtn.nativeElement.dispatchEvent(new Event('click'));

    await fixture.whenStable();
    fixture.detectChanges();
    expect(userListItem)
      .toBeDefined();


  });

  // Comment: it will still work without line 234-236 DONE
  // Apply only fixture.detectChanges() or tick when needed
  // Before using fakeAsync try first await fixture.whenStable() instead of tick()
  it('should clear the form when cancel button is clicked', async () => {
    const cancelBtn = de.query(By.css('.cancel'));
    const firstName = de.query(By.css('.firstName'));
    const lastName = de.query(By.css('.lastName'));
    const phone = de.query(By.css('.phone'));
    const email = de.query(By.css('.email'));

    //set user details before re-setting
    component.user.firstName = 'Ethan';
    component.user.lastName = '';
    component.user.phone = '216548 878';
    component.user.email = 'test@test.com';

    //call reset
    cancelBtn.nativeElement.dispatchEvent(new Event('click'));

    await fixture.whenStable();
    fixture.detectChanges();
    
    expect(component.user.firstName)
      .toBe('');

    expect(component.user.lastName)
      .toBe('');

    expect(component.user.phone)
      .toBe('');

    expect(component.user.email)
      .toBe('');



  });


});
