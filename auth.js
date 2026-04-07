// ============================================================
// SkillForge — Authentication Logic
// Manages mock users via localStorage
// ============================================================

const USERS_KEY = 'skillforge_users';
const CURRENT_USER_KEY = 'skillforge_current_user';

function getUsers() {
    try {
        const data = localStorage.getItem(USERS_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
    const username = localStorage.getItem(CURRENT_USER_KEY);
    if (!username) return null;
    const users = getUsers();
    return users[username] || null;
}

export function signup(username, password) {
    const users = getUsers();
    if (users[username]) {
        throw new Error('Username already exists');
    }
    const newUser = {
        username,
        password,
        profilePic: '', // base64 string
    };
    users[username] = newUser;
    saveUsers(users);
    return login(username, password);
}

export function login(username, password) {
    const users = getUsers();
    const user = users[username];
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Incorrect password');
    }
    localStorage.setItem(CURRENT_USER_KEY, username);
    return user;
}

export function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateProfile(newUsername, newPassword, newProfilePic) {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error('Not logged in');

    const users = getUsers();
    
    // If username changes, we need to migrate the user object and their state
    if (newUsername !== currentUser.username) {
        if (users[newUsername]) {
            throw new Error('New username is already taken');
        }
        
        // Copy user data
        const updatedUser = {
            ...currentUser,
            username: newUsername,
            password: newPassword || currentUser.password,
            profilePic: newProfilePic !== undefined ? newProfilePic : currentUser.profilePic,
        };
        
        // Update users DB
        users[newUsername] = updatedUser;
        delete users[currentUser.username];
        saveUsers(users);
        
        // Migrate state
        const oldStateStr = localStorage.getItem('skillforge_state_' + currentUser.username);
        if (oldStateStr) {
            localStorage.setItem('skillforge_state_' + newUsername, oldStateStr);
            localStorage.removeItem('skillforge_state_' + currentUser.username);
        }
        
        // Update current session
        localStorage.setItem(CURRENT_USER_KEY, newUsername);
        return updatedUser;
    } else {
        // Just update fields
        users[currentUser.username].password = newPassword || currentUser.password;
        if (newProfilePic !== undefined) {
            users[currentUser.username].profilePic = newProfilePic;
        }
        saveUsers(users);
        return users[currentUser.username];
    }
}
