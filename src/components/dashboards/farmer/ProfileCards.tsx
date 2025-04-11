
import React from 'react';
import DocumentUploader from './DocumentUploader';
import SkillsExperience from './SkillsExperience';
import IncomeTracking from './IncomeTracking';

const ProfileCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DocumentUploader />
      <SkillsExperience />
      <IncomeTracking />
    </div>
  );
};

export default ProfileCards;
