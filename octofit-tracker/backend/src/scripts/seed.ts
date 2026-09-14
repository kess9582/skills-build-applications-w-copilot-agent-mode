import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

// Seed the octofit_db database with test data.
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString)

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      { name: 'Alex Morgan', email: 'alex@example.com', avatarUrl: '/avatars/alex.png' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatarUrl: '/avatars/jordan.png' },
      { name: 'Taylor Kim', email: 'taylor@example.com', avatarUrl: '/avatars/taylor.png' },
    ])

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Weekend runners building consistent habits.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility for every level.',
        members: [users[1]._id, users[2]._id],
      },
    ])

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 32, points: 320, completedAt: new Date('2026-09-12T07:30:00Z') },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, points: 360, completedAt: new Date('2026-09-13T08:15:00Z') },
      { user: users[2]._id, type: 'Strength', durationMinutes: 28, points: 280, completedAt: new Date('2026-09-13T17:45:00Z') },
      { user: users[0]._id, type: 'Yoga', durationMinutes: 20, points: 160, completedAt: new Date('2026-09-14T06:45:00Z') },
    ])

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 480, rank: 1 },
      { user: users[1]._id, points: 360, rank: 2 },
      { user: users[2]._id, points: 280, rank: 3 },
    ])

    await Workout.insertMany([
      {
        name: 'Starter Strength',
        description: 'A balanced full-body session for building a strong foundation.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A focused interval workout to improve running endurance.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up walk', 'Tempo intervals', 'Recovery jog', 'Cool-down stretch'],
      },
      {
        name: 'Power Circuit',
        description: 'A challenging circuit for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['Kettlebell swings', 'Burpees', 'Walking lunges', 'Mountain climbers'],
      },
    ])

    console.log('Seeded octofit_db with 3 users, 2 teams, 4 activities, 3 leaderboard entries, and 3 workouts')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase()
