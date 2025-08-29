import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorBio = ({ author }) => {
  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: author?.social?.twitter },
    { name: 'LinkedIn', icon: 'Linkedin', url: author?.social?.linkedin },
    { name: 'Website', icon: 'Globe', url: author?.social?.website }
  ]?.filter(link => link?.url);

  return (
    <div className="bg-muted/30 rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                About {author?.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {author?.bio}
              </p>
              
              {/* Author Stats */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={14} />
                  <span>{author?.articleCount} articles</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{author?.followers} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Joined {author?.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks?.length > 0 && (
              <div className="flex items-center space-x-2">
                {socialLinks?.map((link) => (
                  <Button
                    key={link?.name}
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(link?.url, '_blank')}
                    className="w-9 h-9"
                    title={`Follow on ${link?.name}`}
                  >
                    <Icon name={link?.icon} size={16} />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Follow Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-sm text-muted-foreground">Active trader & educator</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              iconSize={14}
            >
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;