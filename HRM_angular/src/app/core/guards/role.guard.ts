import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Feature } from '../models/role.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the required feature from route data
  const requiredFeature = route.data?.['feature'] as Feature;

  if (!requiredFeature) {
    return true; // No specific feature required
  }

  if (authService.hasPermission(requiredFeature)) {
    return true;
  }

  // If not authorized, maybe redirect to a default page or show an alert. 
  // For now, redirect to the first available page or home.
  // We'll redirect to employee as a fallback or you can add an unauthorized page.
  console.warn('Unauthorized access. Redirecting...');
  return router.parseUrl('/employee');
};
