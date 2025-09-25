import React from 'react';
import { Shield, CheckCircle, Globe, Zap, Users, Lock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Zap style={{color: '#2563eb'}} size={32} />,
      title: "Speed & Efficiency",
      description: "Get verification results within 24-48 hours, not weeks or months."
    },
    {
      icon: <Globe style={{color: '#16a34a'}} size={32} />,
      title: "Global Coverage",
      description: "We work with educational institutions worldwide to provide comprehensive validation services."
    },
    {
      icon: <CheckCircle style={{color: '#9333ea'}} size={32} />,
      title: "Accuracy Guaranteed",
      description: "Our multi-step verification process ensures 99.9% accuracy in credential authentication."
    },
    {
      icon: <Lock style={{color: '#dc2626'}} size={32} />,
      title: "Privacy Protected",
      description: "Your data is encrypted and handled with the highest security standards."
    }
  ];

  const services = [
    "University degree authentication",
    "Professional certificate validation",
    "Diploma and transcript verification",
    "International credential assessment",
    "Digital badge validation"
  ];

  const whoWeServe = [
    {
      title: "Employers",
      description: "Verify candidate qualifications during hiring processes"
    },
    {
      title: "Educational Institutions",
      description: "Authenticate transfer credits and admission requirements"
    },
    {
      title: "Government Agencies",
      description: "Validate credentials for licensing and regulatory purposes"
    },
    {
      title: "Professional Bodies",
      description: "Verify member qualifications and certifications"
    },
    {
      title: "Individuals",
      description: "Provide verified digital credentials for career advancement"
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.heroIcon}>
            <Shield style={{color: '#2563eb'}} size={64} />
          </div>
          <h1 style={styles.heroTitle}>
            About Our Certificate & Degree Validation Service
          </h1>
          <p style={styles.heroSubtitle}>
            Ensuring Academic Integrity in a Digital World
          </p>
        </div>

        {/* Mission Section */}
        <div style={styles.section}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.missionText}>
              We are dedicated to maintaining the integrity of educational achievements by providing fast, accurate, 
              and reliable verification services. Our platform bridges the gap between credential holders and those 
              who need to verify their authenticity, creating a trusted ecosystem for academic validation.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <h3 style={styles.serviceTitle}>
                <CheckCircle style={{color: '#16a34a', marginRight: '12px'}} size={24} />
                Comprehensive Verification Services
              </h3>
              <ul style={styles.serviceList}>
                {services.map((service, index) => (
                  <li key={index} style={styles.serviceItem}>
                    <div style={styles.bullet}></div>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={styles.serviceCard}>
              <h3 style={styles.serviceTitle}>
                <Shield style={{color: '#2563eb', marginRight: '12px'}} size={24} />
                Advanced Security Features
              </h3>
              <ul style={styles.serviceList}>
                <li style={styles.serviceItem}>
                  <div style={styles.bullet}></div>
                  <span>Blockchain-based verification system</span>
                </li>
                <li style={styles.serviceItem}>
                  <div style={styles.bullet}></div>
                  <span>Tamper-proof digital certificates</span>
                </li>
                <li style={styles.serviceItem}>
                  <div style={styles.bullet}></div>
                  <span>Real-time authentication protocols</span>
                </li>
                <li style={styles.serviceItem}>
                  <div style={styles.bullet}></div>
                  <span>Secure data encryption</span>
                </li>
                <li style={styles.serviceItem}>
                  <div style={styles.bullet}></div>
                  <span>Multi-layer verification process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Choose Us</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Who We Serve</h2>
          <div style={styles.clientsGrid}>
            {whoWeServe.map((client, index) => (
              <div key={index} style={styles.clientCard}>
                <div style={styles.clientHeader}>
                  <Users style={{color: '#2563eb', marginRight: '12px'}} size={24} />
                  <h3 style={styles.clientTitle}>{client.title}</h3>
                </div>
                <p style={styles.clientDescription}>{client.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div style={styles.section}>
          <div style={styles.techCard}>
            <h2 style={styles.techTitle}>Our Technology</h2>
            <p style={styles.techDescription}>
              Our platform utilizes cutting-edge technology including artificial intelligence, machine learning algorithms, 
              and blockchain verification to ensure the highest level of accuracy and security. We continuously update our 
              systems to stay ahead of fraudulent activities and maintain the trust of our users.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.card}>
            <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
            <p style={styles.ctaDescription}>
              Contact us today to learn how our validation services can streamline your verification process 
              and protect your organization from credential fraud.
            </p>
            <button style={styles.ctaButton}>
              Contact Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9fafb 0%, #e0f2fe 100%)',
    padding: '64px 16px',
    fontFamily: 'Arial, sans-serif'
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  heroIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px',
    background: 'linear-gradient(45deg, #2563eb, #9333ea)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  section: {
    marginBottom: '80px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '48px',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '48px',
    textAlign: 'center'
  },
  missionText: {
    fontSize: '18px',
    color: '#4b5563',
    lineHeight: '1.7',
    maxWidth: '800px',
    margin: '0 auto'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px'
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '32px'
  },
  serviceTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center'
  },
  serviceList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  serviceItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '12px',
    color: '#4b5563'
  },
  bullet: {
    width: '8px',
    height: '8px',
    backgroundColor: '#2563eb',
    borderRadius: '50%',
    marginTop: '8px',
    marginRight: '12px',
    flexShrink: 0
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  featureIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px'
  },
  featureDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5'
  },
  clientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  clientCard: {
    background: 'linear-gradient(135deg, white 0%, #f9fafb 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    borderLeft: '4px solid #2563eb'
  },
  clientHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  clientTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  clientDescription: {
    color: '#6b7280',
    lineHeight: '1.5'
  },
  techCard: {
    background: 'linear-gradient(45deg, #2563eb, #9333ea)',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '48px',
    textAlign: 'center',
    color: 'white'
  },
  techTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '24px'
  },
  techDescription: {
    fontSize: '18px',
    lineHeight: '1.7',
    maxWidth: '800px',
    margin: '0 auto'
  },
  ctaSection: {
    textAlign: 'center'
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px'
  },
  ctaDescription: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '32px',
    maxWidth: '600px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6'
  },
  ctaButton: {
    background: 'linear-gradient(45deg, #2563eb, #9333ea)',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
  }
};

// Add hover effects
const originalFeatureCard = styles.featureCard;
styles.featureCard = {
  ...originalFeatureCard,
  ':hover': {
    ...originalFeatureCard,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)'
  }
};

export default About;