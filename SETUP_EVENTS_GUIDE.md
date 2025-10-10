# Event Setup Guide

## How to Create/Update Events in Django Admin

### 1. Access Django Admin
- Navigate to: `http://127.0.0.1:8000/admin/`
- Login with your admin credentials

### 2. Create a New Event

#### For **SOLO/Individual Events**:
```
Event ID: unique_event_id (e.g., "symposium2025")
Type: "Symposium" (or any category)
Title: "Test the Symps"
Description: "Your event description"
Image: Upload event image
has_teams: ☐ (UNCHECKED - False)
min_team_size: 1
max_team_size: 1
```

#### For **TEAM Events**:
```
Event ID: unique_event_id (e.g., "hackathon2025")
Type: "Hackathon" (or any category)
Title: "Healthcare.ai Hackathon"
Description: "AI based healthcare challenge"
Image: Upload event image
has_teams: ☑ (CHECKED - True)
min_team_size: 2 (minimum team members required)
max_team_size: 5 (maximum team members allowed)
```

### 3. Update Existing Event

If you've already created "testthesymps" and want to make it a team event:

1. Go to Django Admin → Events
2. Click on "testthesymps" event
3. Check the box: `has_teams: ☑`
4. Set `min_team_size: 2` (or your preferred minimum)
5. Set `max_team_size: 5` (or your preferred maximum)
6. Click "Save"

### 4. Verify Event Type on Frontend

After saving, refresh your frontend. You should see:

**For Individual Events:**
```
👤 Individual Event
[Register Now]
```

**For Team Events:**
```
🏆 Team Event (2-5 members)
[Register Team]
```

### 5. Test Registration

#### Individual Event:
- Click "Register Now"
- Should show: Single registration form
- Fields: Name, Email, Phone, LDAP ID

#### Team Event:
- Click "Register Team"
- Should show: Team registration wizard
- Step 1: Create team name
- Step 2: Add team members (2-5 based on your settings)

### 6. Check Browser Console

When clicking "Register Now/Team", check the browser console (F12) to see:
```
Event Detail: {event_id: "...", has_teams: true/false, ...}
has_teams value: true/false
has_teams type: boolean
Opening TEAM registration / Opening SOLO registration
```

This will help debug if the event data is being received correctly.

## Quick SQL Query (If Needed)

To check events directly in SQLite database:

```bash
cd backend
sqlite3 db.sqlite3
SELECT event_id, title, has_teams, min_team_size, max_team_size FROM api_event;
.exit
```

## Common Issues

### Issue: All events show individual registration
**Solution:** 
- Check that `has_teams` is checked (True) in admin
- Refresh frontend (Ctrl+F5)
- Clear browser cache

### Issue: Button still says "Register Now" instead of "Register Team"
**Solution:**
- Make sure frontend is running latest code
- Restart frontend: `npm start`
- Check browser console for event data

### Issue: Team registration not working
**Solution:**
- Ensure `min_team_size >= 1` and `max_team_size >= min_team_size`
- Check backend logs for errors
- Verify CSRF token is being retrieved

## Example Events Setup

### Example 1: Coding Competition (Individual)
```
Event ID: "coding_comp_2025"
Title: "Code Sprint"
has_teams: False
min_team_size: 1
max_team_size: 1
```

### Example 2: Hackathon (Team)
```
Event ID: "hackathon_2025"
Title: "Healthcare.ai Hackathon"
has_teams: True
min_team_size: 2
max_team_size: 5
```

### Example 3: Workshop (Individual)
```
Event ID: "workshop_ml_2025"
Title: "ML Workshop"
has_teams: False
min_team_size: 1
max_team_size: 1
```

### Example 4: Research Symposium (Team)
```
Event ID: "research_symp_2025"
Title: "Research Symposium"
has_teams: True
min_team_size: 3
max_team_size: 4
```
