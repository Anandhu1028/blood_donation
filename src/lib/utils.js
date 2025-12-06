import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Calculate days until next eligible donation
 */
export function calculateNextDonationDate(lastDonationDate) {
    if (!lastDonationDate) return null;

    const last = new Date(lastDonationDate);
    const next = new Date(last);
    next.setDate(next.getDate() + 90); // 90 days gap

    return next;
}

/**
 * Check if donor is eligible to donate
 */
export function isDonorEligible(lastDonationDate) {
    if (!lastDonationDate) return true;

    const nextDate = calculateNextDonationDate(lastDonationDate);
    return new Date() >= nextDate;
}

/**
 * Calculate days remaining until eligible
 */
export function daysUntilEligible(lastDonationDate) {
    if (!lastDonationDate) return 0;

    const nextDate = calculateNextDonationDate(lastDonationDate);
    const today = new Date();
    const diffTime = nextDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

/**
 * Generate random ID
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate phone number (Indian format)
 */
export function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate email
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate name (No numbers allowed)
 */
export function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}

/**
 * Validate password (At least 8 characters)
 */
export function validatePassword(password) {
    return password && password.length >= 8;
}

/**
 * Generate OTP (mock)
 */
export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Blood compatibility checker
 */
export const bloodCompatibility = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
};

/**
 * Get compatible blood groups for a recipient
 */
export function getCompatibleBloodGroups(recipientBloodGroup) {
    return bloodCompatibility[recipientBloodGroup] || [];
}

/**
 * Get blood group color
 */
export function getBloodGroupColor(bloodGroup) {
    const colors = {
        'A+': 'from-red-500 to-pink-500',
        'A-': 'from-red-600 to-pink-600',
        'B+': 'from-orange-500 to-red-500',
        'B-': 'from-orange-600 to-red-600',
        'AB+': 'from-purple-500 to-pink-500',
        'AB-': 'from-purple-600 to-pink-600',
        'O+': 'from-rose-500 to-red-500',
        'O-': 'from-rose-600 to-red-600',
    };
    return colors[bloodGroup] || 'from-gray-500 to-gray-600';
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{5})$/);
    if (match) {
        return `${match[1]} ${match[2]}`;
    }
    return phone;
}

/**
 * Get availability status color
 */
export function getAvailabilityColor(isAvailable) {
    return isAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
}

/**
 * Get availability badge style
 */
export function getAvailabilityBadge(isAvailable) {
    return isAvailable ? 'badge-success' : 'badge-danger';
}
