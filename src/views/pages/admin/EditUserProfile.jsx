import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import adminApi from '../../../api/adminApi'
import { useParams, useNavigate } from 'react-router-dom'
import './EditUserProfile.css'
import {
  bodyTypeOptions,
  educationLevels,
  heightOptions,
  salaryRanges,
  weightOptions,
} from '../../../static/data'

const EditUserProfile = () => {
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  // Include reset and Controller for better form control
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm()
  // const [cityName, stateName, countryName] = userData.address.split(',').map((item) => item.trim())
  const getAddressParts = () => {
    if (!userData?.address) return { cityName: '', stateName: '', countryName: '' }
    const [cityName, stateName, countryName] = userData.address
      .split(',')
      .map((item) => item.trim())
    return { cityName, stateName, countryName }
  }

  const { cityName, stateName, countryName } = getAddressParts()
  const filteredEducationLevels = educationLevels.filter((x) => x.country === countryName)
  const filteredSalaryRanges = salaryRanges.find((x) => x.country === countryName)

  useEffect(() => {
    console.log('reached here')
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await adminApi.getUserById(userId)
        console.log('user', response)
        setUserData(response.userData)
        reset(response.userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId, reset])

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      setLoading(true)
      await adminApi.updateUser(userId, data)
      alert('User updated successfully!')
      navigate('/admin/users') // Navigate back to users list
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading user data...</div>
  }

  return (
    <div className="edit-user-container">
      <h1>Edit User: {userData?.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Organized in sections for better UX */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label>Name</label>
            <input {...register('name')} />
          </div>

          <div className="form-group">
            <label>Guardian</label>
            <select {...register('guardian')}>
              <option value="Self">Self</option>
              <option value="Daughter">Daughter</option>
              <option value="Son">Son</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Relative/Friends">Relative/Friends</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select {...register('gender')}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input {...register('email')} type="email" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input {...register('phone')} />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              {...register('dob')}
              type="date"
              defaultValue={userData?.dob ? new Date(userData.dob).toISOString().split('T')[0] : ''}
            />
          </div>

          <div className="form-group">
            <label>Introduction</label>
            <textarea {...register('introduction')} rows="4" />
          </div>
        </div>

        <div className="form-section">
          <h2>Location & Preferences</h2>

          <div className="form-group">
            <label>Address</label>
            <textarea {...register('address')} rows="2" />
          </div>

          <div className="form-group">
            <label>Preferred Location</label>
            <textarea {...register('preferredLocation')} rows="2" />
          </div>

          <div className="form-group">
            <label>Height</label>
            <select {...register('height')}>
              {heightOptions.map((option, index) => {
                return <option value={option.label}>{option.label}</option>
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Weight</label>
            <select {...register('weight')}>
              {weightOptions.map((option, index) => {
                return <option value={option}>{option}</option>
              })}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Education & Career</h2>

          <div className="form-group">
            <label>Highest Education</label>
            <select {...register('highestEducation')}>
              {filteredEducationLevels.map((option, index) => {
                return <option value={option.name}>{option.name}</option>
              })}
            </select>
          </div>

          <div className="form-group">
            <label>College</label>
            <input {...register('college')} />
          </div>

          <div className="form-group">
            <label>Industry</label>
            <input {...register('occupation.mainCategory')} />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <input {...register('occupation.subCategory')} />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input {...register('company')} />
          </div>

          <div className="form-group">
            <label>Annual Income</label>
            <select {...register('annualIncome')}>
              {filteredSalaryRanges.ranges.map((option, index) => {
                return <option value={option.label}>{option.label}</option>
              })}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Appearance</h2>

          <div className="form-group">
            <label>Skin Color</label>
            <input {...register('color')} type="color" />
          </div>

          <div className="form-group">
            <label>Body Type</label>
            {/* <select {...register('bodyType')}>
              <option value="Lean">Lean</option>
              <option value="Athletic">Fit</option>
              <option value="Average">Fat</option>
              <option value="Heavy">No Preference</option>
            </select> */}
            <select {...register('bodyType')}>
              {bodyTypeOptions.map((option, index) => {
                return <option value={option}>{option}</option>
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Hair Type</label>
            <select {...register('hairType')}>
              <option value="Wavy">Wavy</option>
              <option value="Curly">Curly</option>
              <option value="Straight">Straight</option>
            </select>
          </div>

          <div className="form-group">
            <label>Hair Style</label>
            <select {...register('hairStyle')}>
              <option value="Bald">Bald</option>
              <option value="Short">Short</option>
              <option value="Very Short">Very Short</option>
              <option value="Long">Long</option>
            </select>
          </div>

          <div className="form-group">
            <label>Beard Type</label>
            <select {...register('beardType')}>
              <option value="Left to Grow">Left to Grow</option>
              <option value="Short Trim">Short Trim</option>
              <option value="Shaved">Shaved</option>
              <option value="One first Cut">One first Cut</option>
            </select>
          </div>

          <div className="form-group">
            <label>Wears Glasses</label>
            <select {...register('isWearGlass')}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="SomeTimes">SomeTimes</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Lifestyle & Preferences</h2>

          <div className="form-group">
            <label>Diet</label>
            <select {...register('diet')}>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div className="form-group">
            <label>Smokes</label>
            <select {...register('smoke')}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">SomeTimes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Cooks Food</label>
            <select {...register('cookFood')}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">SomeTimes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Exercises</label>
            <select {...register('exercise')}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>

          {/* Arrays require special handling */}
          <div className="form-group">
            <label>Hobbies (comma-separated)</label>
            <input {...register('hobbies')} defaultValue={userData?.hobbies?.join(', ')} />
            <small>Enter hobbies separated by commas</small>
          </div>

          <div className="form-group">
            <label>Sports (comma-separated)</label>
            <input {...register('sports')} defaultValue={userData?.sports?.join(', ')} />
            <small>Enter sports separated by commas</small>
          </div>

          <div className="form-group">
            <label>Personality Traits (comma-separated)</label>
            <input
              {...register('otherPersonalities')}
              defaultValue={userData?.otherPersonalities?.join(', ')}
            />
            <small>Enter personality traits separated by commas</small>
          </div>
        </div>

        <div className="form-section">
          <h2>Religious Information</h2>

          <div className="form-group">
            <label>Sect</label>
            <select {...register('sect')}>
              <option value="Sunni">Sunni</option>
              <option value="Shia">Shia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Aqeedah</label>
            <select {...register('aqeedah')}>
              <option value="Athari/Salafi">Athari/Salafi</option>
              <option value="Ashari">Ashari</option>
              <option value="Maturidi">Maturidi</option>
              <option value="Sufi">Sufi</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Path</label>
            <select {...register('path')}>
              <option value="Just Muslim">Just Muslim</option>
              <option value="Sunni">Sunni</option>
              <option value="Jamaat">Jamaat</option>
              <option value="Salafi">Salafi</option>
              <option value="Ahlul Hadees">Ahlul Hadees</option>
              <option value="Tablighi Jamaat">Tablighi Jamaat</option>
              <option value="Barelvi">Barelvi</option>
              <option value="Deobandi">Deobandi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Madhab</label>
            <select {...register('madhab')}>
              <option value="Shafi">Shafi</option>
              <option value="Maliki">Maliki</option>
              <option value="Hanbali">Hanbali</option>
              <option value="Hanafi">Hanafi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Salah</label>
            <select {...register('salah')}>
              <option value="Sometimes at home">Sometimes at home</option>
              <option value="Sometimes at masjid">Sometimes at masjid</option>
              <option value="5 times at home">5 times at home</option>
              <option value="5 times at masjid">5 times at masjid</option>
            </select>
          </div>

          <div className="form-group">
            <label>Recitation of Quran</label>
            <select {...register('recitationOfQuran')}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Only on Friday">Only on Friday</option>
              <option value="Only on Ramadan">Only on Ramadan</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fasting</label>
            <select {...register('fasting')}>
              <option value="Only Fardh">Only Fardh</option>
              <option value="Sunnah and Fardh">Sunnah and Fardh</option>
            </select>
          </div>

          <div className="form-group">
            <label>Zakath</label>
            <select {...register('zakath')}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Partner Preferences</h2>

          <div className="form-group">
            <label>Wedding Expectations</label>
            <select {...register('weddingExpectations')}>
              <option value="Grand">Grand</option>
              <option value="Medium">Medium</option>
              <option value="Minimal">Minimal</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nikkah Expectation</label>
            <select {...register('nikkahExpectation')}>
              <option value="Grand">Grand</option>
              <option value="From Masjid">From Masjid</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Age Range</label>
            <div className="range-inputs">
              <input {...register('preferredAge[0]')} placeholder="Min age" />
              <span>to</span>
              <input {...register('preferredAge[1]')} placeholder="Max age" />
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Height Range</label>
            <div className="range-inputs">
              <input {...register('preferredHeightRange[0]')} placeholder="Min height" />
              <span>to</span>
              <input {...register('preferredHeightRange[1]')} placeholder="Max height" />
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Color</label>
            <input {...register('preferredColor')} type="color" />
          </div>

          <div className="form-group">
            <label>Preferred Body Type</label>
            <select {...register('preferredBodyType')}>
              <option value="Lean">Lean</option>
              <option value="Fit">Fit</option>
              <option value="Fat">Fat</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          <div className="form-group">
            <label>Religious Preference</label>
            <select {...register('relegiousPreference')}>
              <option value="Nuetral">Nuetral</option>
              <option value="Relegious">Relegious</option>
              <option value="Pious">Pious</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Sect</label>
            <select {...register('preferredSect')}>
              <option value="Sunni">Sunni</option>
              <option value="Shia">Shia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Open To Requests From (comma-separated)</label>
            <input
              {...register('openToRequestFrom')}
              defaultValue={userData?.openToRequestFrom?.join(', ')}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/users')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserProfile
