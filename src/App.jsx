import React, { useState } from 'react';
import './App.css';
import { submitQuestionnaire } from './appwrite';

function App() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '', contactInfo: '', location: '', description: '',
    mainGoal: '', mainGoalOther: '', targetAudience: '', currentWebsite: '',
    hasLogo: '', brandColors: '', visualStyle: '', visualStyleOther: '',
    pagesNeeded: [], features: [], orgSize: '', launchDate: '',
    budget: '', primaryAction: '', notes: ''
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleCheck = (field, item) => {
    const currentList = formData[field];
    const newList = currentList.includes(item) 
      ? currentList.filter(i => i !== item) 
      : [...currentList, item];
    updateField(field, newList);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submission = { 
        ...formData, 
        pagesNeeded: formData.pagesNeeded.join(', '), 
        features: formData.features.join(', ') 
      };
      await submitQuestionnaire(submission);
      setStep(100);
    } catch (e) { alert("Error: " + e.message); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Grow Local Creative</h1>
        <p>Website Onboarding Questionnaire</p>
      </header>

      <div className="card">
        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <section>
            <h2>1. Who are you?</h2>
            <label>Business/Organization Name*</label>
            <input value={formData.businessName} onChange={e => updateField('businessName', e.target.value)} placeholder="e.g. Sunny Day Farm" />
            
            <label>Primary Contact (Name, Phone, Email)*</label>
            <textarea value={formData.contactInfo} onChange={e => updateField('contactInfo', e.target.value)} placeholder="How do I reach you?" />
            
            <label>Location (City/Region)</label>
            <input value={formData.location} onChange={e => updateField('location', e.target.value)} placeholder="Cool, CA" />

            <label>Briefly, what do you do?</label>
            <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="1-2 sentences about your mission" />
            
            <button className="btn-primary" onClick={() => setStep(2)} disabled={!formData.businessName || !formData.contactInfo}>Next: The Vision →</button>
          </section>
        )}

        {/* STEP 2: PURPOSE */}
        {step === 2 && (
          <section>
            <h2>2. The Vision</h2>
            <label>Main Goal of your website</label>
            <select value={formData.mainGoal} onChange={e => updateField('mainGoal', e.target.value)}>
              <option value="">Select one...</option>
              <option value="Inquiries">Generate inquiries or leads</option>
              <option value="Showcase">Showcase work/products</option>
              <option value="Info">Provide info/mission</option>
              <option value="Booking">Online scheduling/registration</option>
              <option value="Store">Online store/donations</option>
              <option value="other">Other...</option>
            </select>
            {formData.mainGoal === 'other' && (
              <input placeholder="What is your unique goal?" onChange={e => updateField('mainGoalOther', e.target.value)} />
            )}

            <label>Target Audience</label>
            <textarea value={formData.targetAudience} onChange={e => updateField('targetAudience', e.target.value)} placeholder="Who are we trying to reach?" />

            <label>Current Website (if any)</label>
            <input value={formData.currentWebsite} onChange={e => updateField('currentWebsite', e.target.value)} placeholder="https://..." />
            
            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next: Branding →</button>
            </div>
          </section>
        )}

        {/* STEP 3: BRANDING & STYLE */}
        {step === 3 && (
          <section>
            <h2>3. Branding & Style</h2>
            <label>Do you have a logo?</label>
            <select value={formData.hasLogo} onChange={e => updateField('hasLogo', e.target.value)}>
                <option value="">Select...</option>
                <option value="Yes">Yes, I have one</option>
                <option value="No">No, I need one</option>
            </select>

            <label>Brand Colors (if any)</label>
            <input value={formData.brandColors} onChange={e => updateField('brandColors', e.target.value)} placeholder="e.g. Sage green and cream" />

            <label>Visual Style Preference</label>
            <select value={formData.visualStyle} onChange={e => updateField('visualStyle', e.target.value)}>
              <option value="">Choose a vibe...</option>
              <option value="Minimal">Minimal & Clean</option>
              <option value="Professional">Professional & Trustworthy</option>
              <option value="Bold">Bold & Vibrant</option>
              <option value="other">Other...</option>
            </select>
            {formData.visualStyle === 'other' && (
              <input placeholder="Describe your vibe..." onChange={e => updateField('visualStyleOther', e.target.value)} />
            )}
            
            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(4)}>Next: Features →</button>
            </div>
          </section>
        )}

        {/* STEP 4: PAGES & FEATURES */}
        {step === 4 && (
          <section>
            <h2>4. Pages & Features</h2>
            <label>Check the pages you'll need:</label>
            <div className="checkbox-group">
              {['Home', 'About', 'Services', 'Contact', 'Gallery', 'Testimonials', 'Blog', 'Shop'].map(page => (
                <div key={page} className="checkbox-item" onClick={() => toggleCheck('pagesNeeded', page)}>
                  <input type="checkbox" checked={formData.pagesNeeded.includes(page)} readOnly /> {page}
                </div>
              ))}
            </div>

            <label>Check the features you'll need:</label>
            <div className="checkbox-group">
              {['Contact Form', 'Booking', 'Ecommerce', 'Google Maps', 'Social Links', 'Newsletter'].map(feat => (
                <div key={feat} className="checkbox-item" onClick={() => toggleCheck('features', feat)}>
                  <input type="checkbox" checked={formData.features.includes(feat)} readOnly /> {feat}
                </div>
              ))}
            </div>
            
            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(5)}>Next: Logistics →</button>
            </div>
          </section>
        )}

        {/* STEP 5: LOGISTICS & TIMELINE */}
        {step === 5 && (
          <section>
            <h2>5. Logistics & Timeline</h2>
            <label>Organization Size</label>
            <select value={formData.orgSize} onChange={e => updateField('orgSize', e.target.value)}>
                <option value="">Select...</option>
                <option value="Solo">Solo</option>
                <option value="Small">Small Team</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
            </select>

            <label>Preferred Launch Date</label>
            <input type="date" value={formData.launchDate} onChange={e => updateField('launchDate', e.target.value)} />

            <label>Estimated Budget</label>
            <input value={formData.budget} onChange={e => updateField('budget', e.target.value)} placeholder="e.g. $2k - $5k" />
            
            <label>#1 Action you want visitors to take*</label>
<select 
  value={formData.primaryAction} 
  onChange={e => updateField('primaryAction', e.target.value)}
>
    <option value="">Select an action...</option>
    <option value="Call">Call</option>
    <option value="Email">Email</option>
    <option value="Donate">Donate</option>
    <option value="Purchase">Purchase</option>
    <option value="Register">Register</option>
    <option value="Form">Fill out a form</option>
    <option value="Other">Other</option>
</select>

            <label>Anything else I should know?</label>
            <textarea value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
            
            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(4)}>Back</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Sending to Renee...' : 'Finish & Submit!'}
              </button>
            </div>
          </section>
        )}

        {/* SUCCESS STATE */}
        {step === 100 && (
          <div className="success-box">
            <h2>Success! 🎉</h2>
            <p>Your details have been sent to Renee. I'll review your vision and reach out soon!</p>
            <button className="btn-secondary" onClick={() => setStep(1)}>Submit another</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;