import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { User } from '../clases/user';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    
   }

  public sendEmail(user: User, mensaje: string) {
    let templateParams =  {      
      toName: user.nombre,
      message: mensaje,
      toEmail: user.email,
    }
      console.log(user);
      console.log(templateParams);
      

      emailjs.send('default_service','template_d67lyqm', templateParams, "52vzMvOwcvd0FcGpq")
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(err) {
         console.log('FAILED...', err);
      });
    
  }
}
