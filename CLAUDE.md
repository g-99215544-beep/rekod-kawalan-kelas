# CLAUDE.md - AI Assistant Guide for Rekod Pemantauan Kelas SKSA

## Project Overview

**Rekod Pemantauan Kelas SKSA** (SK Sri Aman Classroom Monitoring Records) is a Progressive Web App (PWA) for tracking classroom attendance and teacher schedules at SK Sri Aman primary school in Malaysia.

### Purpose
- Track which teachers are present in which classrooms during each teaching period
- Record student attendance numbers per class
- Monitor student behavior (Sahsiah) - both good practices and discipline issues
- Provide admin functions for event management and teacher list maintenance

### Language
The application is entirely in **Malay (Bahasa Malaysia)**. All UI text, comments, and data use Malay language conventions.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Pure HTML, CSS, JavaScript (no framework) |
| Database | Firebase Realtime Database |
| Hosting | GitHub Pages |
| App Type | Progressive Web App (PWA) |

### Firebase Databases
The app uses **two separate Firebase databases**:

1. **Main Database** (`kehadiran-murid-6ece0`)
   - Stores: classroom records, attendance, student data, events, notifications
   - Config: `database.js`

2. **Teachers Database** (`pinjaman-4b662`)
   - Stores: teacher/staff information
   - Config: `teachers-db.js`

---

## File Structure

```
rekod-kawalan-kelas/
├── index.html           # Main single-page application (all HTML, CSS, JS)
├── database.js          # Firebase config for main database
├── teachers-db.js       # Firebase config for teachers database
├── manifest.json        # PWA manifest
├── app-icon-192.png     # PWA icon (192x192)
├── app-icon-512.png     # PWA icon (512x512)
├── guru-data.json       # Teacher data backup (JSON)
├── upload-guru.html     # Admin tool for uploading teacher data
├── UPLOAD-GURU-README.md # Documentation for teacher upload tool
└── .nojekyll            # Disables Jekyll processing on GitHub Pages
```

### Main Application (index.html)
The entire application is contained in a single `index.html` file with:
- **Lines 1-258**: CSS styles
- **Lines 259-612**: HTML structure
- **Lines 614-end**: JavaScript logic

---

## Firebase Data Structure

### Main Database Paths

| Path | Purpose | Example Data |
|------|---------|--------------|
| `kawalan/` | Classroom monitoring records | `{tarikh, waktu, namaGuru, kelas, tempat, jumlahMurid, ...}` |
| `notifications/` | Sahsiah (behavior) reports | `{tarikh, namaMurid, jenis, kategori, status, ...}` |
| `kehadiran/{date}/{class}` | Daily attendance summary | `{present: 28, total: 30}` |
| `config/classes/classData/{class}` | Student lists by class | Array of student names |
| `events/` | School events | `{name, date, kelas[], waktu[]}` |

### Teachers Database Paths

| Path | Purpose | Example Data |
|------|---------|--------------|
| `guru/` | Teacher/staff information | `{nama, gred, telefon, jawatan}` |

---

## Key Domain Concepts

### Teaching Periods (Waktu)
The school day has **13 periods (W1-W13)**:

| Code | Time | Notes |
|------|------|-------|
| W1 | 7:40 - 8:10 | |
| W2 | 8:10 - 8:40 | |
| W3 | 8:40 - 9:10 | |
| W4 | 9:10 - 9:40 | |
| W5 | 9:40 - 10:10 | **Rehat (Break) for Tahap 1** |
| W6 | 10:10 - 10:40 | |
| W7 | 10:40 - 11:10 | **Rehat (Break) for Tahap 2** |
| W8 | 11:10 - 11:40 | |
| W9 | 11:40 - 12:10 | |
| W10 | 12:10 - 12:40 | **Friday: All go home** |
| W11 | 12:40 - 13:10 | |
| W12 | 13:10 - 13:40 | |
| W13 | 13:40 - 14:10 | **Tahap 1 goes home (PULANG)** |

### Class Levels (Tahap)
- **Tahap 1**: Years 1, 2, 3 (and Prasekolah/Pre-school)
  - Break at W5
  - Go home after W12 (13:10)
- **Tahap 2**: Years 4, 5, 6
  - Break at W7
  - Go home after W13 (14:10)

### Friday Schedule
All classes end at **W10 (12:10 PM)** on Fridays.

### Class Types (Jenis Kelas)
- **Kelas Penuh**: Full class with all students
- **Kelas Pecahan**: Split class for specific subjects (BC, BA, Pemulihan, Moral)

### Subject Abbreviations (Mata Pelajaran)
| Code | Full Name |
|------|-----------|
| BC | Bahasa Cina (Chinese) |
| BA | Bahasa Arab (Arabic) |
| PEMULIHAN | Remedial class |
| MORAL | Moral education |

### Sahsiah (Student Behavior)
- **jenis: "baik"**: Good behavior/practice (Amalan Baik)
- **jenis: "jahat"**: Discipline issue (Kesalahan Disiplin)
- **status: "pending"**: Awaiting admin review
- **status: "confirmed"**: Reviewed by admin

---

## Date/Time Formats

| Context | Format | Example |
|---------|--------|---------|
| Display (tarikh) | DD/MM/YYYY | 16/01/2026 |
| Firebase key | YYYY-MM-DD | 2026-01-16 |
| Time display | HH:MM:SS | 14:30:45 |

### Helper Functions
```javascript
formatDate(d)      // Returns DD/MM/YYYY
formatDateKey(d)   // Returns YYYY-MM-DD
formatTime(d)      // Returns HH:MM:SS
getCurrentPeriod() // Returns current period object or null
```

---

## Application Views

### Public Views
1. **Isi Rekod (Fill Record)**: Form to submit classroom monitoring data
2. **Rekod Hari Ini (Today's Records)**: Grid view of all classes and periods

### Admin Panel
Access by clicking school logo 5 times. Password: `admin123`

Admin functions:
1. **Semak Laporan Sahsiah**: Review student behavior reports
2. **Semak Rekod Kawalan**: Check monitoring records by date/class
3. **Tetapan Event**: Manage school events
4. **Urus Senarai Guru**: Manage teacher list

---

## Code Conventions

### Variable Naming
- Malay terms used throughout (e.g., `namaGuru`, `jumlahMurid`, `tarikh`)
- Firebase references use `db.ref()` for main database
- Teachers database uses `teachersDb.ref()`

### CSS Conventions
- BEM-like class naming
- Mobile-first responsive design
- Color scheme: Green primary (#047857, #059669)
- Pill-style badges for categories

### Key CSS Classes
| Class | Purpose |
|-------|---------|
| `.app-card` | Main container |
| `.input-card` | Form sections |
| `.tab-btn` | Navigation tabs |
| `.pill-*` | Status badges |
| `.cell-empty` | Empty table cell (yellow) |
| `.cell-filled` | Filled table cell |
| `.cell-rehat` | Break period cell (green) |

---

## Important Functions

### Record Submission
```javascript
// Save classroom record
saveRecordToFirebase(rec)  // Saves to kawalan/

// Save behavior record
saveSahsiahRecord(record)  // Saves to notifications/
```

### Data Loading
```javascript
// Load teacher list
loadGuruFromFirebase()     // From teachers DB guru/

// Load today's class grid
loadAllClassesToday()      // From kawalan/

// Load attendance for selected class
loadKehadiranForKelas()    // From kehadiran/
```

### UI State Management
```javascript
setSubTab(tab)             // Switch between form/today view
setMode(mode)              // Toggle good/bad behavior panel
updateJenisKelas()         // Handle class type selection
```

---

## Development Guidelines

### When Making Changes

1. **Single-file architecture**: All code is in `index.html`. CSS is in `<style>`, JS is in `<script>`.

2. **No build process**: Changes are live immediately when served.

3. **Testing locally**: Open `index.html` directly or use a local server:
   ```bash
   python -m http.server 8000
   ```

4. **Firebase dependencies**: Ensure Firebase SDK is loaded before any DB operations.

### Common Modifications

#### Adding a new teacher
Use `upload-guru.html` or add directly to Firebase `guru/` path.

#### Adding a new class
Add to Firebase `config/classes/classData/{className}` with student array.

#### Adding a new location (tempat)
Add `<option>` to the `#tempat` select element in HTML.

#### Adding a new subject (for split classes)
Add `<option>` to `#mataPelajaran` select and handle in validation/display logic.

### Debugging Tips

1. **Firebase issues**: Check browser console for Firebase errors
2. **Data not loading**: Verify Firebase rules allow read access
3. **Caching issues**: Service Worker was removed; hard refresh should work
4. **Admin access**: Click logo 5 times, password is `admin123`

---

## Security Notes

### Current Implementation
- Admin password is hardcoded (`admin123`)
- Firebase rules should be configured for appropriate access
- No user authentication implemented

### Sensitive Data
- Teacher phone numbers stored in Firebase
- Student names stored by class

### Recommendations for Production
1. Implement proper authentication
2. Use Firebase security rules
3. Move admin password to environment config
4. Consider data encryption for sensitive fields

---

## Recent Changes History

| Date | Change |
|------|--------|
| Recent | Added attendance validation - blocks monitoring record submission if attendance not filled for today |
| Recent | Removed Service Worker to fix persistent caching issues |
| Recent | Fixed notification badge showing wrong count |
| Recent | Fixed sahsiah records not loading all data from Firebase |
| Recent | Fixed dropdown fields issues |

---

## Quick Reference

### Firebase Paths
```
kawalan/                     # Monitoring records
notifications/               # Sahsiah reports
kehadiran/{date}/{class}     # Attendance
config/classes/classData/    # Student lists
events/                      # School events
guru/                        # Teachers (separate DB)
```

### Key IDs
```
#namaGuru          - Teacher dropdown
#kelas             - Class dropdown
#tempat            - Location dropdown
#jumlahMurid       - Student count input
#waktuMengajar     - Period count select
#allClassSchedule  - Today's record grid
```

### Admin Access
- Click school logo 5 times
- Password: `admin123`
